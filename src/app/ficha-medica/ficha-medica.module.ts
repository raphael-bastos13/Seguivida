import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaMedicaPageRoutingModule } from './ficha-medica-routing.module';

import { FichaMedicaPage } from './ficha-medica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaMedicaPageRoutingModule,
  ],
  declarations: [FichaMedicaPage],
})
export class FichaMedicaPageModule {}
