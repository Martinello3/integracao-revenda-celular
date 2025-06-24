import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoresPageRoutingModule } from './stores-routing.module';

import { StoresPage } from './stores.page';
import { StoreFormComponent } from './store-form/store-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoresPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaskitoDirective,
  ],
  declarations: [
    StoresPage,
    StoreFormComponent,
  ]
})
export class StoresPageModule {}
