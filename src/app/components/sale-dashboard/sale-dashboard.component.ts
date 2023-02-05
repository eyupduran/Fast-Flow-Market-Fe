import { ProductSalesModel } from './../../models/productSalesModel';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sale-dashboard',
  templateUrl: './sale-dashboard.component.html',
  styleUrls: ['./sale-dashboard.component.css']
})
export class SaleDashboardComponent implements OnInit {

  constructor(private productService:ProductService,
    public authService:AuthService) { }

  productSales:ProductSalesModel[]

  totalUnitSold:number=0;
  orderCount:number=0;
  totalEarning:number=0

  ngOnInit(): void {
    this.authService.getUserData();
    this.getSales()
  }

  getSales(){
  this.productService.getProductSaleByUserId(this.authService.userData.userId).subscribe(response=>{
      this.productSales=response.data
    this.productSales.forEach(element => {
      this.totalUnitSold+=element.totalSales
      this.orderCount+=element.numberOfPurchasers
      this.totalEarning+=element.unitPrice*element.totalSales
    });
  })
}
}
