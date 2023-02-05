import { ListResponseModel } from './../models/listResponseModel';
import { ActiveOrdersModel } from './../models/activeOrdersModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { OrderModel } from './../models/orderModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  apiUrl = 'https://localhost:44316/api/Orders/';
  constructor(private httpClient:HttpClient,
    private route:Router) { }

    addOrder(orderModel:OrderModel){
     return this.httpClient.post<SingleResponseModel<OrderModel>>(this.apiUrl + "addorder",orderModel)
    }
    getActiveOrdersByUserId(userId:number){
      let newpath=this.apiUrl + "getOrdersDetailByUserId?userId=" +userId;
      return this.httpClient.get<ListResponseModel<ActiveOrdersModel>>(newpath)
    }
}
