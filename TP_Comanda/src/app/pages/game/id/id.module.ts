import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdPageRoutingModule } from './id-routing.module';

import { IdPage } from './id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdPageRoutingModule
  ],
  declarations: [IdPage]
})
export class IdPageModule {}
