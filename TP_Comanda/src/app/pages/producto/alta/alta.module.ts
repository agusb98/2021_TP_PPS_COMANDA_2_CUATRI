import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AltaPageRoutingModule } from './alta-routing.module';
import { AltaPage } from './alta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AltaPageRoutingModule
  ],
  declarations: [AltaPage]
})
export class AltaPageModule {}
