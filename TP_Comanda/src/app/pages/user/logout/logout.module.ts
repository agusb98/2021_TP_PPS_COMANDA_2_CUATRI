import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { LogoutPageRoutingModule } from './logout-routing.module';
import { LogoutPage } from './logout.page';

@NgModule({
  imports: [IonicModule, CommonModule, LogoutPageRoutingModule],
  declarations: [LogoutPage],
})

export class LogoutPageModule { }
