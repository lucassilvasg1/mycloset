import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor() { }

  getPages() {
    return [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Perfil',
        url: '/perfil',
        icon: 'person'
      }
    ];
  }
}
