import { ShoppingCartComponent } from './../components/shopping-cart/shopping-cart.component';
import { ShoppingCartModel } from './../models/shoppingCartModel';
import { ShoppingCartDetailModel } from './../models/shoppingCartDetailModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  apiUrl = 'https://localhost:44316/api/ShoppingCarts/';
  

  constructor(private httpClient: HttpClient) { }

  addToShoppingCart(shoppingCartModel:ShoppingCartModel){
    return this.httpClient.
    post<SingleResponseModel<ShoppingCartModel>>(this.apiUrl+"addshoppingcart",shoppingCartModel)
  }
  getUserShoppingCartDetail(userId: number) {
    let newPath = this.apiUrl + "getshoppingcartproductdetailbyuserıd?userId=" + userId;
    return this.httpClient
      .get<ListResponseModel<ShoppingCartDetailModel>>(newPath)
  }
  deleteShoppingCart(shoppingCartModel:ShoppingCartModel){
    let newPath = this.apiUrl + "deleteshoppingcart";
    return this.httpClient.post<SingleResponseModel<ShoppingCartModel>>(newPath,shoppingCartModel);
  }
  changeQuantity(shoppingCartComponent:ShoppingCartComponent){
    let newPath=this.apiUrl+"updateshoppingcart"
    return this.httpClient.post<SingleResponseModel<ResponseModel>>(newPath,shoppingCartComponent)
  }
}
