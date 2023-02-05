import { UserDataModel } from 'src/app/models/userDataModel';
import { RegisterModel } from './../models/registerModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable, Subject } from 'rxjs';
import { TokenModel } from './../models/tokenModel';
import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './../models/loginModel';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelperService: JwtHelperService = new JwtHelperService();

  apiUrl = 'https://localhost:44316/api/Auth/';
  
  userData:UserDataModel

  constructor(private httpClient:HttpClient,
    private route:Router) { 
    }
    
  
  login(loginModel:LoginModel){
    return this.httpClient.post<TokenModel>(this.apiUrl+"login",loginModel)
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(this.apiUrl+"register",registerModel)
  }

  getUserData(){
    let newPath = this.apiUrl + "getuserdetailbyuserıd?userId="+this.getCurrentUserId()
    return this.httpClient.get<SingleResponseModel<UserDataModel>>(newPath).subscribe(response=>{
      this.userData = response.data
    })
  }

  logout(){
    localStorage.removeItem("token")
    window.location.reload();
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  // getToken() {
  //   return localStorage.getItem('token');
  // }

  //  getDecodedToken() {
  //   let token = this.getToken();
  //   return this.jwtHelperService.decodeToken(token);
  // }

   getCurrentUserId() {
    let token = localStorage.getItem('token');
    let decodedToken = this.jwtHelperService.decodeToken(token);
    let nameidentifierString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/nameidentifier')
    )[0];
    let userId: number = decodedToken[nameidentifierString];
    return userId;
  }


}
