import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBhPoW6I2nLWveo8DUM8pccbiODomqLCxg',
  authDomain: 'foodyummy-f8d93.firebaseapp.com',
  databaseURL: 'https://foodyummy-f8d93.firebaseio.com',
  projectId: 'foodyummy-f8d93',
  storageBucket: '',
  messagingSenderId: '265568185065',
  appId: '1:265568185065:web:ba8bc61a27adfc22'
};
firebase.initializeApp(config);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
