import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessoriesPage } from './accessories.page';
import { AccessoryFormComponent } from './accessory-form/accessory-form.component';

const routes: Routes = [
  {
    path: '',
    component: AccessoriesPage
  },
  {
    path: 'new',
    component: AccessoryFormComponent
  },
  {
    path: 'edit/:id',
    component: AccessoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessoriesPageRoutingModule { }
