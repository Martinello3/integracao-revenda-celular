import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersPage } from './customers.page';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersPage
  },
  {
    path: 'new',
    component: CustomerFormComponent
  },
  {
    path: 'edit/:id',
    component: CustomerFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersPageRoutingModule {}
