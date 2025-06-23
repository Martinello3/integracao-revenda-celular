import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'phones',
    loadChildren: () => import('./phones/phones.module').then(m => m.PhonesPageModule)
  },
  {
    path: 'brands',
    loadChildren: () => import('./brands/brands.module').then(m => m.BrandsPageModule)
  },
  {
    path: 'accessories',
    loadChildren: () => import('./accessories/accessories.module').then(m => m.AccessoriesPageModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./stores/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then( m => m.SalesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
