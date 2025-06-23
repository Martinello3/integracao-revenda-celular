import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessoriesPageRoutingModule } from './accessories-routing.module';

import { AccessoriesPage } from './accessories.page';
import { AccessoryFormComponent } from './accessory-form/accessory-form.component';
import { MaskitoDirective } from '@maskito/angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessoriesPageRoutingModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AccessoriesPage,
    AccessoryFormComponent,
  ]
})
export class AccessoriesPageModule { }
