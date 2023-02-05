import { ProductModel } from './../models/productModel';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: ProductModel[], filterText: string): ProductModel[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:ProductModel)=>p.productName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }
  

}
