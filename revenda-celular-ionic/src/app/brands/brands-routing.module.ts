import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandsPage } from './brands.page';
import { BrandFormComponent } from './brand-form/brand-form.component';

const routes: Routes = [
  {
    path: '',
    component: BrandsPage
  },
  {
    path: 'new',
    component: BrandFormComponent
  },
  {
    path: 'edit/:id',
    component: BrandFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandsPageRoutingModule {}
