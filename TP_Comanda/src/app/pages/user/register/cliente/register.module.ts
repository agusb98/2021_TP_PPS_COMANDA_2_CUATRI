import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [CommonModule, RegisterPageRoutingModule],
  declarations: [RegisterPage],
})

export class RegisterPageModule { }
