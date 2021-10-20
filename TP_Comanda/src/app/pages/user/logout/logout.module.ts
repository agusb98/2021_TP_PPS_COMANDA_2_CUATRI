import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LogoutPageRoutingModule } from './logout-routing.module';
import { LogoutPage } from './logout.page';

@NgModule({
  imports: [CommonModule, LogoutPageRoutingModule],
  declarations: [LogoutPage],
})

export class LogoutPageModule { }
