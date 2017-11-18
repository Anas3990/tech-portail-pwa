import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-new',
  templateUrl: 'add-new.html',
})
export class AddNewPage {
  //
  title: string;
  body: string;

  //
  private newsCollection: AngularFirestoreCollection<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private afs: AngularFirestore) {
    // 
    this.newsCollection = afs.collection('news');
  }

  addNew() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()

    console.log("Bouton appuyé")

    if (this.body == undefined) {
      this.newsCollection.add({
        'title': this.title,
        'body': "Aucune description n'a été fournie.",

        'timestamp': timestamp
      }).then(_ => {

      }).catch(error => {

      });
    } else {
      this.newsCollection.add({
        'title': this.title,
        'body': this.body,
        'timestamp': timestamp
      }).then(_ => {

      }).catch(error => {

      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
