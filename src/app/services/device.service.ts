import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  isMobile = window.innerWidth <= 920;
  isDesktop = window.innerWidth > 920;
  constructor() { }
}
