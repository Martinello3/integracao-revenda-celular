import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomersPageRoutingModule } from './customers-routing.module';
import { CustomersPage } from './customers.page';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CustomersPageRoutingModule,
    MaskitoDirective
  ],
  declarations: [CustomersPage, CustomerFormComponent]
})
export class CustomersPageModule {}
