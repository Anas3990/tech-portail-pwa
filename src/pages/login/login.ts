import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//
import { AngularFireAuth } from 'angularfire2/auth';

//
import { AuthProvider } from './../../providers/auth/auth';

//
import { TabsPage } from './../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //
  email: string;
  password: string;

  constructor(public navParams: NavParams, public authService: AuthProvider, private afAuth: AngularFireAuth) {
  }
}
