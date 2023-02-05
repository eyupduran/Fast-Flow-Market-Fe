import { CargoModel } from './../models/cargoModel';
import { ListResponseModel } from './../models/listResponseModel';
import { ContactInfoModel } from './../models/contactInfoModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  apiUrl = 'https://localhost:44316/api/ContactInfoes/';
  constructor(private httpClient: HttpClient) { }
  addContactInfo(contactInfoModel:ContactInfoModel){
    return this.httpClient.
    post<SingleResponseModel<ContactInfoModel>>(this.apiUrl+"addcontactinfo",contactInfoModel)
  }

  getContactInfoByUserId(userId:number){
    return this.httpClient.
    get<SingleResponseModel<ContactInfoModel>>(this.apiUrl+"getcontactınfobyuserıd?userId="+userId)
  }

  updateContactInfo(contactInfoModel:ContactInfoModel){
    return this.httpClient.
    post<SingleResponseModel<ContactInfoModel>>(this.apiUrl+"updatecontactinfo",contactInfoModel)
  }

  getAllCargo(){
    return this.httpClient.get<ListResponseModel<CargoModel>>("https://localhost:44316/api/Cargoes/getallcargoes")
  }
}
