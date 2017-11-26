import { NgModule, ErrorHandler  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Plugins natifs de l'application
import { FCM } from '@ionic-native/fcm';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Services de Firebase (AngularFire2)
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Fichier de Configuration de Firebase
import { firebaseConfig } from './firebase.credentials';

// Components de l'application
import { LoginPage } from './../pages/login/login';

import { DashboardPage } from '../pages/dashboard/dashboard';

import { NewsPage } from './../pages/news/news';
import { NewInfosPage } from './../pages/new-infos/new-infos';
import { AddNewPage } from './../pages/add-new/add-new';
import { EditNewPage } from './../pages/edit-new/edit-new';

import { EventsPage } from './../pages/events/events'
import { EventInfosPage } from './../pages/event-infos/event-infos';
import { AttendancesPage } from './../pages/attendances/attendances';
import { AddAttendancePage } from './../pages/add-attendance/add-attendance';
import { AddEventPage } from './../pages/add-event/add-event';

import { TeamPage } from './../pages/team/team';
import { UserInfosPage } from './../pages/user-infos/user-infos';

import { TabsPage } from '../pages/tabs/tabs';


//
import { DatabaseProvider } from '../providers/database/database';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    NewsPage,
    NewInfosPage,
    AddNewPage,
    EditNewPage,
    EventsPage,
    EventInfosPage,
    AttendancesPage,
    AddAttendancePage,
    AddEventPage,
    TeamPage,
    UserInfosPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
      monthShortNames: ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi' ],
      dayShortNames: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam' ],
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    NewsPage,
    NewInfosPage,
    AddNewPage,
    EditNewPage,
    EventsPage,
    EventInfosPage,
    AttendancesPage,
    AddAttendancePage,
    AddEventPage,
    TeamPage,
    UserInfosPage,
    TabsPage
  ],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    AuthProvider
  ]
})
export class AppModule {}
