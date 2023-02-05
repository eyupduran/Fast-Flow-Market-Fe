import { ResponseModel } from "./responseModel";

export interface ListResponseModel<T> extends ResponseModel{ //bütün list responseler için ortak kullanabileceğimiz bir yapı 
    data:T[];
}