import { AuthService } from 'src/app/services/auth.service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanActivate {
 constructor(public authService:AuthService){

 }
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
        let isLogin:boolean = this.authService.loggedIn()
        return !isLogin;
    }
  
}
