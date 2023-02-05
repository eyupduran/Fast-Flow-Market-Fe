import { AuthService } from 'src/app/services/auth.service';
import { BankAccountModel } from './../../models/bankAccountModel';
import { BankAccountService } from './../../services/bank-account.service';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css'],
})
export class BankAccountComponent implements OnInit {

  bankAccount: BankAccountModel;

  bankAccountId?: number;
  cartNumber: string = '';
  cartName: string = '';
  expirationDate: string = '';
  securityCode: string = '';
  ibanNo: string = '';

  constructor(
    private toastrService: ToastrService,
    private bankAccountService: BankAccountService,
    public authService:AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserData();
  }

  addBankAccountInfo() {
    this.bankAccount = {
      bankAccountId: this.bankAccountId,
      userId: this.authService.userData.userId,
      cartNumber: this.cartNumber,
      cartName: this.cartName,
      expirationDate: this.expirationDate,
      securityCode: this.securityCode,
      ibanNo: this.ibanNo,
    };

    this.bankAccountService.addContactInfo(this.bankAccount).subscribe(
      (response) => {
        this.toastrService.success(
          response.message,
          'Bilgileriniz başarılı bir şekilde eklendi.'
        );
        console.log(this.bankAccount);
      },
      (responseError) => {
        this.toastrService.error(
          responseError.error.message,
          'Contact info oluşturma hatası'
        );
      }
    );
  }
}
