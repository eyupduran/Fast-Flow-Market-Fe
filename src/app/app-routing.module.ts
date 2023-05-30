import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SaleDashboardComponent } from './components/sale-dashboard/sale-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderComponent } from './components/order/order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { RefreshGuard } from './guards/refresh.guard';

const routes: Routes = [
  {path:"", component:ProductListComponent},
  {path:"login", component:LoginComponent, canActivate:[RefreshGuard]},
  {path:"register", component:RegisterComponent},
  {path:"products", component:ProductListComponent},
  {path:"product/detail/:productId", component:ProductDetailComponent,canActivate:[LoginGuard]},

  {path:"products/category/:categoryId", component:ProductListComponent},
  {path:"product/add", component:ProductAddComponent,canActivate:[LoginGuard]},
  {path:"shoppingCart", component:ShoppingCartComponent,canActivate:[LoginGuard]},
  {path:"contact-info", component:ContactInfoComponent,canActivate:[LoginGuard]},
  {path:"bank-account", component:BankAccountComponent,canActivate:[LoginGuard]},
  {path:"checkout", component:CheckoutComponent,canActivate:[LoginGuard]},
  {path:"orders", component:OrderComponent,canActivate:[LoginGuard]},
  {path:"sale-dashboard", component:SaleDashboardComponent,canActivate:[LoginGuard]},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
