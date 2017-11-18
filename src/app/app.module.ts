import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


// Services de Firebase (AngularFire2)
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Importation du fichier qui contient les informatinos sur le projet Firebase (Tech Portail)
import { firebaseConfig } from './firebase.credentials';

import { LoginPage } from './../pages/login/login';

import { DashboardPage } from '../pages/dashboard/dashboard';

import { NewsPage } from './../pages/news/news';
import { AddNewPage } from './../pages/add-new/add-new';

import { EventsPage } from './../pages/events/events';
import { TabsPage } from '../pages/tabs/tabs';
import { TeamPage } from './../pages/team/team';

//
import { DatabaseProvider } from '../providers/database/database';
import { AuthProvider } from '../providers/auth/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    NewsPage,
    AddNewPage,
    EventsPage,
    TeamPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    NewsPage,
    AddNewPage,
    EventsPage,
    TeamPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    AuthProvider
  ]
})
export class AppModule {}
