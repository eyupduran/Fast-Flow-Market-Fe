import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(public authService:AuthService){
  }
  // private readonly tokenCheckIntervalInMinutes = 1;

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.refreshLocalStorage()
     }
    // this.startTokenCheckTimer();
  }
  refreshLocalStorage() {
      window.localStorage.clear();
      window.location.reload()
  }
  //  startTokenCheckTimer(): void {
  //   const tokenCheckIntervalInMs = this.tokenCheckIntervalInMinutes * 60000; // Dakikayı milisaniyeye çevirin
  //   setInterval(() => {
  //     if (this.authService.isTokenExpired()) {
  //       this.refreshLocalStorage(); // Token süresi dolmuşsa kullanıcıyı oturum açma sayfasına yönlendirin
  //     }
  //   }, tokenCheckIntervalInMs);
  // }
  
}
