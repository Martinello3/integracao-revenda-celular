import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhonesPage } from './phones.page';
import { PhoneFormComponent } from './phone-form/phone-form.component';

const routes: Routes = [
  {
    path: '',
    component: PhonesPage
  },
  {
    path: 'new',
    component: PhoneFormComponent
  },
  {
    path: 'edit/:id',
    component: PhoneFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhonesPageRoutingModule {}
