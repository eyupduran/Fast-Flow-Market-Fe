import { CategoryService } from './../../services/category.service';
import { CategoryModel } from './../../models/categoryModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  //update here if the categoryName order changes
  categoryIcon:string[]=["https://img.icons8.com/color/30/null/food-bar.png",
  "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/25/null/external-electronics-diy-flaticons-lineal-color-flat-icons.png",
  "https://img.icons8.com/color/30/null/jumper.png",
  "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/30/null/external-personal-care-inhome-service-flaticons-lineal-color-flat-icons.png",
  "https://img.icons8.com/color/30/null/stroller.png",
  "https://img.icons8.com/color/30/null/sports.png",
  "https://img.icons8.com/color/30/null/books.png",
  "https://img.icons8.com/color/30/null/home--v1.png",
  "https://img.icons8.com/color/30/null/recovery.png",
  "https://img.icons8.com/color/30/null/pets--v2.png",
];

    categories:CategoryModel[];
  constructor(private categoryService:CategoryService) { }
  
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe((response=>{
      this.categories=response.data;
    }))
  }


}
