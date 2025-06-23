import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';

import { SalesPage } from './sales.page';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { SaleDetailsComponent } from './sale-details/sale-details.component';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SalesPageRoutingModule,
    MaskitoDirective
  ],
  declarations: [
    SalesPage,
    SaleFormComponent,
    SaleDetailsComponent
  ]
})
export class SalesPageModule {}
