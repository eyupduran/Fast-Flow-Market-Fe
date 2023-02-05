import { Router } from '@angular/router';
import { ContactInfoService } from './../../services/contact-info.service';
import {  ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartDetailModel } from 'src/app/models/shoppingCartDetailModel';

import { ShoppingCartModel } from 'src/app/models/shoppingCartModel';
import { ContactInfoModel } from 'src/app/models/contactInfoModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartProducts: ShoppingCartDetailModel[]
  deletingShoppingCart: ShoppingCartModel
  selectedElement: ShoppingCartDetailModel;
  contactInfo:ContactInfoModel;
  
  updatingElement:any;
  selectedUpdatingElement:any;
  shipping:number=10 ;

  quantity: number = 1
  hasShoppingCart: boolean = false

  allTotalQuantityOfCardItem:number=0;
  
  constructor(private shoppingCartService: ShoppingCartService,
    private toastrService: ToastrService,
    private contactInfoService:ContactInfoService,
    private route:Router,
    public authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getUserData();
    this.getUserShoppingCartDetail();
  }

  getUserShoppingCartDetail() {
    this.shoppingCartService.getUserShoppingCartDetail(this.authService.userData.userId).subscribe(response => {
      this.shoppingCartProducts = response.data;
      this.shoppingCartProducts.forEach(element => {
        this.allTotalQuantityOfCardItem += element.quantity * element.unitPrice;
      });
      if (this.shoppingCartProducts.length > 0) {
        this.hasShoppingCart = true
      }
      else {
        this.hasShoppingCart = false
      }
    })
  }

  completeShopping(){
      this.contactInfoService.getContactInfoByUserId(this.authService.userData.userId).
      subscribe(response =>{
        if (response.data!=null) {
          this.route.navigate(["/checkout"])
        }
        else{
          this.route.navigate(["/contact-info"])
        }
      })
  }

  deleteShoppingCart() {
    this.deletingShoppingCart = {
      shoppingCartId: this.selectedElement.shoppingCartId,
      productId: this.selectedElement.productId,
      userId: this.selectedElement.userId
    }
    this.shoppingCartService.deleteShoppingCart(this.deletingShoppingCart).subscribe(response => {
      this.toastrService.success(response.message)
      this.allTotalQuantityOfCardItem=0;
      this.getUserShoppingCartDetail();
    }, responseError => {
      this.toastrService.error(responseError.error.message
        , "Ürün silme başarısız")
    })
  }

  selectedShoppingCart(shoppingCartDetailModel: ShoppingCartDetailModel) {
    this.selectedElement = shoppingCartDetailModel;
  }

  updatingShoppingCart(shoppingCartModel: ShoppingCartModel) {
    this.updatingElement = shoppingCartModel;
  }

  increaseQuantity(){
    this.selectedUpdatingElement = {
      shoppingCartId: this.updatingElement.shoppingCartId,
      productId: this.updatingElement.productId,
      userId: this.updatingElement.userId,
      quantity: this.updatingElement.quantity +1
    }
    this.shoppingCartService.changeQuantity(this.selectedUpdatingElement).subscribe(response=>{
      this.allTotalQuantityOfCardItem=0;
      this.getUserShoppingCartDetail();

    })
  }
  decreaseQuantity(){
    this.selectedUpdatingElement = {
      shoppingCartId: this.updatingElement.shoppingCartId,
      productId: this.updatingElement.productId,
      userId: this.updatingElement.userId,
      quantity: this.updatingElement.quantity -1
    }
    if (this.selectedUpdatingElement.quantity<1) {
      this.shoppingCartService.deleteShoppingCart(this.selectedUpdatingElement).subscribe(response => {
        this.toastrService.success(response.message)
        this.allTotalQuantityOfCardItem=0;
        this.getUserShoppingCartDetail();
      })
    }
    else{
       this.shoppingCartService.changeQuantity(this.selectedUpdatingElement).subscribe(response=>{
        this.allTotalQuantityOfCardItem=0;
        this.getUserShoppingCartDetail();

    })
    }
   
  }

}
