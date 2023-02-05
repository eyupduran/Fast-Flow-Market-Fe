import { ProductSalesModel } from './../models/productSalesModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from './../models/listResponseModel';
import { ProductImageModel } from './../models/productImageModel';
import { ProductModel } from './../models/productModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  apiUrl = 'https://localhost:44316/api/Products/';
  

  constructor(private httpClient: HttpClient) { }

  addProduct(productModel:ProductModel){
    return this.httpClient.
    post<SingleResponseModel<ProductModel>>(this.apiUrl+"addproduct",productModel)
  }

  getAllProducts():Observable<ListResponseModel<ProductModel>>{
    let newPath = this.apiUrl + "getallproductdetails";
    return this.httpClient.
    get<ListResponseModel<ProductModel>>(newPath);
  }

  getProductsByCategory(categoryId: number): Observable<ListResponseModel<ProductModel>> {
    let newPath = this.apiUrl + "Getallproductdetailbycategoryıd?categoryId=" + categoryId;
    return this.httpClient
      .get<ListResponseModel<ProductModel>>(newPath)
  }
  getProductSaleByUserId(userId:number){
    let newPath = this.apiUrl + "getproductsalebyuserıd?userId=" + userId;
    return this.httpClient.get<ListResponseModel<ProductSalesModel>>(newPath)
  }
  getproductdetailbypoductıd(productId:number){
    let newpath = this.apiUrl + "Getproductdetailbypoductıd?productId=" +productId
    return this.httpClient.get<SingleResponseModel<ProductModel>>(newpath);
  }
  
  getProductsByUserId(userId:number){
    let newpath = this.apiUrl + "getproductsbyuserıd?userId=" +userId
    return this.httpClient.get<ListResponseModel<ProductModel>>(newpath);
  }
}
