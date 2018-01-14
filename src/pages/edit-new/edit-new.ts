import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

//
import { New } from '../../Models/New';

@Component({
  selector: 'page-edit-new',
  template: `
  <ion-header>
    <ion-navbar color="gray">
      <ion-title>Modifier</ion-title>

      <ion-buttons start>
        <button ion-button (click)="dismiss()">
          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>
  
  <ion-content class="outer-content">
  
  </ion-content>
`
})
export class EditNewPage {
  new: New;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewWillLoad() {
    this.new = this.navParams.get('newObject');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
