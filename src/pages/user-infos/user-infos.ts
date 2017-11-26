import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-user-infos',
  templateUrl: 'user-infos.html',
})
export class UserInfosPage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.user = this.navParams.get('userObject');
  }
}
