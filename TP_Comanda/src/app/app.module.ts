import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
