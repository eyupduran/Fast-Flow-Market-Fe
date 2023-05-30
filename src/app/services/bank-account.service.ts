import { BankAccountModel } from './../models/bankAccountModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  apiUrl = `${environment.apiUrl}BankAccounts/`

  //apiUrl = 'https://localhost:44316/api/BankAccounts/';

  constructor(private httpClient: HttpClient) { }

  addContactInfo(bankAccountModel:BankAccountModel){
    return this.httpClient.
    post<SingleResponseModel<BankAccountModel>>(this.apiUrl+"addbankaccount",bankAccountModel)
  }

  // getContactInfoByUserId(userId:number){
  //   return this.httpClient.
  //   get<SingleResponseModel<ContactInfoModel>>(this.apiUrl+"getcontactınfobyuserıd?userId="+userId)
  // }

}
