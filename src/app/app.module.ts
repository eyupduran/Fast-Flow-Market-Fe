import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SaleDashboardComponent } from './components/sale-dashboard/sale-dashboard.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    ProductAddComponent,
    ProductListComponent,
    FilterPipePipe,
    ShoppingCartComponent,
    ContactInfoComponent,
    BankAccountComponent,
    CheckoutComponent,
    OrderComponent,
    NotFoundComponent,
    SaleDashboardComponent,
    ProductDetailComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
