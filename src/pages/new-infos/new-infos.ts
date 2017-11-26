import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//
import { New } from '../../Models/New';

@IonicPage()
@Component({
  selector: 'page-new-infos',
  templateUrl: 'new-infos.html',
})
export class NewInfosPage {
  new: New;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.new = this.navParams.get('newObject');
  }

}
