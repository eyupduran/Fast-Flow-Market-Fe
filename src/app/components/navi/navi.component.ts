import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserDataModel } from 'src/app/models/userDataModel';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
  providers: [AuthService]
})
export class NaviComponent implements OnInit {

  canAddProduct: boolean=false;
  productAdd:string="productAdd"
  constructor(public authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getUserData();

    this.authService.userData.operationClaims.forEach(element => {
      if (element.name == "productAdd") {
        this.canAddProduct = true
      }
    });
  }

}

