import { ContactInfoService } from './../../services/contact-info.service';
import { ActiveOrdersModel } from './../../models/activeOrdersModel';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

import { ContactInfoModel } from 'src/app/models/contactInfoModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService:OrderService,
    private contactInfoService:ContactInfoService,
    public authService:AuthService
    ) { }

  contactInfo:ContactInfoModel;
  cargoName:string=""
  activeOrders:ActiveOrdersModel[]
  allTotalQuantityOfCardItem:number=0

  hasOrder:boolean=false

  shipping:number=10
  ngOnInit(): void {
    this.authService.getUserData();
    this.getContactInfoByUserId();
    this.getActiveOrders();
    
  }

  getActiveOrders(){
    this.orderService.getActiveOrdersByUserId(this.authService.userData.userId).subscribe(response=>{
      this.activeOrders=response.data
      this.cargoName=response.data[0].cargoName;
      this.activeOrders.forEach(element => {
        this.allTotalQuantityOfCardItem += element.quantity * element.unitPrice;
      });
      if (this.activeOrders[0]!=null) {
        this.hasOrder=true
      }
      else{
        this.hasOrder=false
      }
    })
  }

  getContactInfoByUserId(){
    this.contactInfoService.getContactInfoByUserId(this.authService.userData.userId).subscribe(response=>{
      this.contactInfo=response.data
    })
  }

}
