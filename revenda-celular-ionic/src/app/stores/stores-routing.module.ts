import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresPage } from './stores.page';
import { StoreFormComponent } from './store-form/store-form.component';

const routes: Routes = [
  {
    path: '',
    component: StoresPage
  },
  {
    path: 'new',
    component: StoreFormComponent
  },
  {
    path: 'edit/:id',
    component: StoreFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresPageRoutingModule {}
