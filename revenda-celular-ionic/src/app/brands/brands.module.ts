import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrandsPageRoutingModule } from './brands-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrandsPage } from './brands.page';
import { BrandFormComponent } from './brand-form/brand-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandsPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    BrandsPage, 
    BrandFormComponent
  ]
})
export class BrandsPageModule {}
