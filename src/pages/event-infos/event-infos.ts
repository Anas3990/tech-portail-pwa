import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController  } from 'ionic-angular';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//
import { AuthProvider } from './../../providers/auth/auth';

//
import { AddAttendancePage } from './../add-attendance/add-attendance';

//
import { Event } from './../../models/Event';
import { Attendance } from './../../models/Attendance';

@IonicPage()
@Component({
  selector: 'page-event-infos',
  templateUrl: 'event-infos.html',
})
export class EventInfosPage {
  event: Event;

  //
  userName: string;
  userId: string;

  //
  attendancesCollection: AngularFirestoreCollection<Attendance>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private toastCtrl: ToastController, private alertCtrl: AlertController, private afs: AngularFirestore, private authService: AuthProvider) {
    //
    this.event = this.navParams.get('eventObject');

    //
    this.authService.user.subscribe(user => {
      this.userName = user.firstName + " " + user.name
      this.userId = user.uid
    });

    //
    this.attendancesCollection = this.afs.collection('/events').doc(this.event.id).collection('attendances');
  }

  showAddAttendanceModal() {
    let addAttendanceModal = this.modalCtrl.create(AddAttendancePage, { eventId: this.event.id });
    addAttendanceModal.present();
  }

  postNonAttendance() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()

    this.attendancesCollection.doc(this.userId).set({
      name: this.userName,
      present: false,
      confirmedAt: timestamp
    })
    .then(_ => {
      let toast = this.toastCtrl.create({
        message: 'Votre absence a été confirmée avec succès.',
        duration: 2000,
        showCloseButton: false
      });

      toast.present();
    })
    .catch(error => {
      let alert = this.alertCtrl.create({
        title: 'Oups !',
        message: "Une erreur est survenue : " + error,
          buttons: [{
            text: 'Ok',
            role: 'cancel'
          }]
        });
        
        alert.present();
    })
  }
}
