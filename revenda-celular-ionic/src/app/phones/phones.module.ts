import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhonesPageRoutingModule } from './phones-routing.module';

import { PhonesPage } from './phones.page';
import { PhoneFormComponent } from './phone-form/phone-form.component';
import { MaskitoDirective } from '@maskito/angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhonesPageRoutingModule,
    MaskitoDirective,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    PhonesPage,
    PhoneFormComponent,
  ]
})
export class PhonesPageModule {}
