import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesPage } from './sales.page';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { SaleDetailsComponent } from './sale-details/sale-details.component';

const routes: Routes = [
  {
    path: '',
    component: SalesPage
  },
  {
    path: 'new',
    component: SaleFormComponent
  },
  {
    path: 'edit/:id',
    component: SaleFormComponent
  },
  {
    path: 'details/:id',
    component: SaleDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesPageRoutingModule {}
