import { UserDataModel } from 'src/app/models/userDataModel';
import { CategoryService } from './../../services/category.service';
import { SingleResponseModel } from './../../models/singleResponseModel';
import { ProductImageModel } from './../../models/productImageModel';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from './../../models/productModel';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from 'src/app/models/categoryModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    public authService:AuthService) { }

  fileToUpload: File | null = null;
  product: ProductModel;
  productImage: ProductImageModel;
  productId: any;
  productName: string;
  description: string;
  unitPrice: string;
  categoryId: number;
  categoryId2: number;
  Image: any;
  productImageId: number;
  productImageId2: number;
  categories: CategoryModel[];

  isSelect : boolean = false

  isUpload : boolean = false

  ngOnInit(): void {
    this.getCategories();
    this.authService.getUserData();
  }

  add() {
    this.product = {
      productId:this.productId,
      productName: this.productName,
      description: this.description,
      unitPrice: this.unitPrice,
      categoryId: +this.categoryId2,
      productImageId: this.productImageId2,
      userId: this.authService.userData.userId
    }
    if (this.isUpload) {
      this.productService.addProduct(this.product).subscribe((response) => {
        this.toastrService.success("Ürün başarıyla eklendi")
      }, responseError => {
        this.toastrService.error(responseError.error, "Ürün eklenemedi.")
      })
    }
    else{
      this.toastrService.error("Form bilgilerini kontrol ediniz.")
    }
  
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  addImage() {
    if (this.productName !=null && 
      this.description !=null&&
       this.unitPrice != null &&
       this.isSelect
     ) {
      this.productImage = { productImageId: this.productImageId, Image: this.fileToUpload }
      this.addProductImage(this.productImage).subscribe(response => {
        this.productImageId2 = response.data.productImageId;
        this.isUpload=true
        this.toastrService.success("Ürün fotosu başarıyla eklendi")
      }, responseError => {
        this.toastrService.error(responseError.error.message
          , "Ürün ekleme başarısız")
      })
    }
    else{
      this.toastrService.error("Lütfen form bilgilerini kontol ediniz.")
    }
  }

  addProductImage(productImageModel: any) {
    const formData: FormData = new FormData();
    formData.append('Image', this.fileToUpload, this.fileToUpload.name);
    productImageModel = formData;
    return this.httpClient.post<SingleResponseModel<ProductImageModel>>('https://localhost:44316/api/ImageUpload/add', productImageModel)
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((response => {
      this.categories = response.data;
    }))
  }
  selectOption(id: number) {
    this.categoryId2 = id;
    this.isSelect=true
  }
}
