import { Router } from '@angular/router';
import { ContactInfoModel } from './../../models/contactInfoModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactInfoService } from './../../services/contact-info.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  
  constructor(private toastrService:ToastrService,
    private contactInfoService:ContactInfoService,
    private formBuilder:FormBuilder,
    public authService:AuthService,
    private route:Router) { }
    
  contactInfo:ContactInfoModel;
  contactInfoId:number

  userId:number
  country:string=""
  city:string=""
  address:string=""

  phoneNumber:string=""
  
  ngOnInit(): void {
    this.authService.getUserData();
    this.getContactInfoByUserId();
  }

  addContactInfo(){
    this.contactInfo = {contactInfoId:this.contactInfoId,userId:this.authService.userData.userId,country:this.country,
      city:this.city,address:this.address, phoneNumber:this.phoneNumber}

   if (this.contactInfoId) {
    this.contactInfoService.updateContactInfo(this.contactInfo).subscribe(response=>{
      this.toastrService.success(response.message,"Adres bilgileriniz başarıyla güncellendi")
      this.route.navigate(["/products"])
    })
   } 
   else{
     this.contactInfoService.addContactInfo(this.contactInfo).subscribe(response=>{
       this.toastrService.success(response.message,"Adres bilgileriniz başarılı bir şekilde eklendi.")
       this.route.navigate(["/checkout"])
     },(responseError)=>{
       this.toastrService.error(responseError.error.message
         ,"Contact info oluşturma hatası")
     })
   }  
  }
  getContactInfoByUserId(){
    this.contactInfoService.getContactInfoByUserId(this.authService.userData.userId).subscribe(response =>{
      this.country=response.data.country
      this.city=response.data.city
      this.address=response.data.address
      this.phoneNumber=response.data.phoneNumber
      this.contactInfoId=response.data.contactInfoId
    })
  }
  
}
