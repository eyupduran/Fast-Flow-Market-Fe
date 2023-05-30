import { DeviceService } from './../../services/device.service';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { ShoppingCartModel } from './../../models/shoppingCartModel';
import { ProductService } from './../../services/product.service';
import { ProductModel } from './../../models/productModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductModel[];
  filterText:string="";

  selectedProduct:ProductModel;

  shoppingCart:ShoppingCartModel;

  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private shoppingCartService:ShoppingCartService,
    private toastrService:ToastrService,
    private route:Router,
    public deviceService:DeviceService,
    public authService:AuthService) { }

  
  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.refreshLocalStorage()
     }
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProducts()
      }
      this.authService.getUserData();
    })
  }
  getProducts() {
    this.productService.getAllProducts().subscribe(response=>{
      this.products = response.data;
    })   
  }

  getProductsByCategory(categoryId:number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response.data
    })   
  }

  addShoppingCart(){
    if (this.authService.userData==null) {
      this.toastrService.info("Önce sisteme giriş yapmalısınız!")     
      this.route.navigate(["/login"])
    }
    this.shoppingCart={productId:this.selectedProduct.productId,userId:this.authService.userData.userId}
    if (this.authService.userData.userId === this.selectedProduct.userId) {
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

 selectProduct(product:ProductModel){
  this.selectedProduct=product;
 }

 goProductDetail(product:ProductModel){
  if ( this.authService.isAuthenticated()) {
    this.route.navigate(['/product/detail', product.productId]);
  }
 }
 refreshLocalStorage() {
    window.localStorage.clear();
    window.location.reload()
}
}
