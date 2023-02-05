import { OrderService } from './../../services/order.service';
import { CargoModel } from './../../models/cargoModel';
import { ContactInfoService } from './../../services/contact-info.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartDetailModel } from 'src/app/models/shoppingCartDetailModel';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderModel } from 'src/app/models/orderModel';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartModel } from 'src/app/models/shoppingCartModel';
import { Router } from '@angular/router';
import { ProductInShoppingCartModel } from 'src/app/models/productInShoppingCartModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productInShoppingCartModel:ProductInShoppingCartModel;
  shoppingCartModel:ShoppingCartModel;

  cargoes: CargoModel[];

  selected:number=1

  shoppingCartProducts: ShoppingCartDetailModel[]
  allTotalQuantityOfCardItem:number=0;
  country:string
  city:string
  address:string
  phoneNumber:string
  fullAddress:string;
  shiping:number=10;
  cargoId:number
  date:Date = new Date();  
  orderModel:OrderModel
  isSelected:boolean = false
  constructor(private shoppingCartService:ShoppingCartService,
    private contactInfoService:ContactInfoService,
    private orderService:OrderService,
    private toastrService:ToastrService,
    private route:Router,
    public authService:AuthService
    ) { }

  ngOnInit(): void {
    this.authService.getUserData();

    this.getUserShoppingCartDetail();
    this.getContactInfoByUserId();
    this.getAllCargoes();
  }

  getUserShoppingCartDetail() {
    this.shoppingCartService.getUserShoppingCartDetail(this.authService.userData.userId).subscribe(response => {
      this.shoppingCartProducts = response.data;
      this.shoppingCartProducts.forEach(element => {
        this.allTotalQuantityOfCardItem += element.quantity * element.unitPrice;
      });
    })
  }

  getContactInfoByUserId(){
    this.contactInfoService.getContactInfoByUserId(this.authService.userData.userId).subscribe(response =>{
      this.country=response.data.country
      this.city=response.data.city
      this.address=response.data.address
      this.phoneNumber=response.data.phoneNumber
      this.fullAddress = this.country + " " + this.city +" " + this.address 
    })
  }

  getAllCargoes(){
    this.contactInfoService.getAllCargo().subscribe(response=>{
      this.cargoes=response.data
    })
  }
  addOrder(){
    if (this.isSelected) {
      for (const { index, value } of this.shoppingCartProducts.map((value, index) => 
    ({ index, value }))) {
      this.productInShoppingCartModel={
        productId:value.productId,
        quantity:value.quantity}

      this.orderModel={
        productId:value.productId,
        orderDate:this.date.toDateString(),
        cargoId:+this.cargoId,
        userId:this.authService.userData.userId,
        orderStatusId:1,
        quantity:this.productInShoppingCartModel.quantity}

        this.shoppingCartModel = {
          shoppingCartId: value.shoppingCartId,
          productId: value.productId,
          userId: this.authService.userData.userId
        }
        this.orderService.addOrder(this.orderModel).subscribe(response=>{
        })
        this.shoppingCartService.deleteShoppingCart(this.shoppingCartModel).subscribe(response=>{
          if (index ==this.shoppingCartProducts.length-1) {
            this.toastrService.success("Siparişiniz başarıyla alındı.")
            this.route.navigate(["/products"])
          }
        }) 
    }
  }

  else{
    this.toastrService.error("Bir hata oluştu","Bilgileri kontrol ediniz.")
  }
}
    
  selectOption(id: number) {
    this.cargoId = id;
    this.isSelected =true
  }
}
