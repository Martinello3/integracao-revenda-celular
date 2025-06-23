import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Celulares', url: '/phones', icon: 'phone-portrait' },
    { title: 'Marcas', url: '/brands', icon: 'business' },
    { title: 'Acessórios', url: '/accessories', icon: 'hardware-chip' },
    { title: 'Lojas', url: '/stores', icon: 'storefront' },
    { title: 'Clientes', url: '/customers', icon: 'people' },
    { title: 'Vendas', url: '/sales', icon: 'cart' }
  ];

  constructor() { }
}
