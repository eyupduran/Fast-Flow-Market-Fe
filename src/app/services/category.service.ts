import { CategoryModel } from './../models/categoryModel';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 // apiUrl = 'https://localhost:44316/api/Categories/';
  apiUrl = `${environment.apiUrl}Categories/`

  
  constructor(private httpClient: HttpClient) { }

  getAllCategories():Observable<ListResponseModel<CategoryModel>>{
    let newPath = this.apiUrl + "getallcategories";
    return this.httpClient.
    get<ListResponseModel<CategoryModel>>(newPath);
  }
}
