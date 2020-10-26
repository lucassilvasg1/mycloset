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
        title: 'Favoritos',
        url: '/favorite',
        icon: 'heart'
      },
      {
        title: 'Configurações',
        url: '/perfil',
        icon: 'cog'
      }
    ];
  }
}
