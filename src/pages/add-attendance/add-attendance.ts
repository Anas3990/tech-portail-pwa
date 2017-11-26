import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

//
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//
import { AuthProvider } from './../../providers/auth/auth';

//
import { Attendance } from './../../models/Attendance';

@IonicPage()
@Component({
  selector: 'page-add-attendance',
  templateUrl: 'add-attendance.html',
  template: `
  <ion-header>
  
    <ion-navbar color="gray">
      <ion-title>Confirmer ma présence</ion-title>
  
      <ion-buttons start>
        <button ion-button (click)="dismiss()">
          <ion-icon name="md-close"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
  
  </ion-header>
  
  
  <ion-content>
    <form [formGroup]="attendanceForm" (ngSubmit)="postAttendanceForm()">
      <ion-list>
        <ion-item>
          <ion-label>De :</ion-label>
          <ion-datetime doneText="OK" cancelText="ANNULER" pickerFormat="HH:mm" displayFormat="HH:mm" [(ngModel)]="attendanceStart" name="attendanceStart" formControlName="attendanceStartDate"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label>À :</ion-label>
          <ion-datetime doneText="OK" cancelText="ANNULER" pickerFormat="HH:mm" displayFormat="HH:mm" [(ngModel)]="attendanceEnd" name="attendanceEnd" formControlName="attendanceEndDate"></ion-datetime>
        </ion-item>

        <button ion-button type="submit" [disabled]="!attendanceForm.valid" color="gray" clear block>Confirmer ma présence</button>
      </ion-list>
    </form>
  </ion-content>  
`
})
export class AddAttendancePage {
  //
  attendanceStart: Date;
  attendanceEnd: Date;

  //
  userName: string;
  userId: string;

  //
  eventId: string;

  //
  private attendanceForm: FormGroup;

  //
  attendancesCollection: AngularFirestoreCollection<Attendance>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private afs: AngularFirestore, public authService: AuthProvider) {
    //
    this.eventId = this.navParams.get('eventId');

    //
    this.authService.user.subscribe(user => {
      this.userName = user.firstName + " " + user.name
      this.userId = user.uid
    });

    //
    this.attendanceForm = this.formBuilder.group({
      attendanceStartDate: ['', Validators.required],
      attendanceEndDate: ['', Validators.required],
    });

    //
    this.attendancesCollection = this.afs.collection('/events').doc(this.eventId).collection('attendances');
  }

  postAttendanceForm() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()

    this.attendancesCollection.doc(this.userId).set({
      name: this.userName,
      present: true,
      attendanceStartsAt: this.attendanceStart,
      attendanceEndsAt: this.attendanceEnd,
      confirmedAt: timestamp
    })
    .then(_ => {
      this.viewCtrl.dismiss();
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

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
