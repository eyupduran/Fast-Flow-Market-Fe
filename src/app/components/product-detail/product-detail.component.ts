import { DeviceService } from './../../services/device.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from './../../models/productModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartModel } from 'src/app/models/shoppingCartModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  shoppingCart:ShoppingCartModel;
  products:ProductModel[]
  userId:number

  product:ProductModel
  productId :number
  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private shoppingCartService:ShoppingCartService,
    private route:Router,
    public deviceService:DeviceService,
    public authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getProductDetail(params["productId"])
    })
    this.authService.getUserData();
    setTimeout(() => {
      this.getProductsByUserId()
    }, 100)
     
  }

  getProductDetail(productId:number){
    this.productService.getproductdetailbypoductıd(productId).subscribe(response=>{
      this.product = response.data
      this.userId=response.data.userId

    })
  }

  addShoppingCart(){
    if (this.authService.userData==null) {
      this.toastrService.info("Önce sisteme giriş yapmalısınız!")     
      this.route.navigate(["/login"])
    }
    this.shoppingCart={productId:this.product.productId,userId:this.authService.userData.userId}
    if (this.authService.userData.userId === this.product.userId) {
      this.toastrService.error("Kendi ürününüzü satın alamazsınız")     
    }
    else{
      this.shoppingCartService.addToShoppingCart(this.shoppingCart).subscribe((response)=>{
        this.toastrService.success("Ürün başarıyla sepete eklendi")
      },responseError=>{
            this.toastrService.error(responseError.error.message,"Sepete eklenemedi")     
      })
    }
 }

 getProductsByUserId(){
  this.productService.getProductsByUserId(this.userId).subscribe(response=>{
      this.products=response.data
  })
}

selectedProduct(product:ProductModel){
  this.route.navigate(['/product/detail', product.productId]);
}
}
