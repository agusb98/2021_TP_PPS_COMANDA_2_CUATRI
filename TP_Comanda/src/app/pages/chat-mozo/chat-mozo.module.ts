import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatMozoPageRoutingModule } from './chat-mozo-routing.module';

import { ChatMozoPage } from './chat-mozo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatMozoPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ChatMozoPage]
})
export class ChatMozoPageModule {}
