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
import { Event } from './../../models/Event';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
  template: `
  <ion-header>
  
    <ion-navbar color="gray">
      <ion-title>Ajouter un évènement</ion-title>

      <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="light" showWhen="ios">Annuler</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
    </ion-navbar>
  
  </ion-header>
  
  
  <ion-content class="outer-content"> 
    <ion-list>
      <ion-item>
        <ion-avatar item-start>
          <img src="assets/imgs/placeholder-profile-image.jpg">
        </ion-avatar>
        <h2>{{ (authService.user | async)?.firstName }} {{ (authService.user | async)?.name }}</h2>
        <p style="color:#F0AD4E;" >{{ (authService.user | async)?.email }}</p>
      </ion-item>
    </ion-list>

    <form [formGroup]="postEventForm" (ngSubmit)="addEvent()">
      <ion-list>
        <ion-item>
          <ion-label fixed>Titre</ion-label>
          <ion-input type="text" [(ngModel)]="title" name="title" formControlName="title"></ion-input>
        </ion-item>
      </ion-list>
        
      <ion-list>
        <ion-item>
          <ion-label>Début</ion-label>
          <ion-datetime doneText="OK" cancelText="ANNULER" [min]="todayDate" pickerFormat="MMM DD, YYYY HH:mm" displayFormat="Le DDDD DD MMM YYYY, à HH:mm" [(ngModel)]="startDate" name="startDate" formControlName="startDate"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label>Fin</ion-label>
          <ion-datetime doneText="OK" cancelText="ANNULER" [min]="todayDate" pickerFormat="MMM DD, YYYY HH:mm" displayFormat="Le DDDD DD MMM YYYY, à HH:mm" [(ngModel)]="endDate" name="endDate" formControlName="endDate"></ion-datetime>
        </ion-item>
      </ion-list>
        
      <ion-list>
        <ion-item>
          <ion-textarea placeholder="Description" [(ngModel)]="body" name="body" formControlName="body"></ion-textarea>
        </ion-item>
      </ion-list>
        
      <div class="spacer" style="height:30px;" id="login-spacer1"></div>

      <button ion-button type="submit" [disabled]="!postEventForm.valid" color="gray" block clear>Ajouter l'évènement</button>
    </form>
    
  </ion-content>
`
})
export class AddEventPage {
  //
  todayDate = new Date().toJSON().split('T')[0];

  //
  title: string;
  startDate: Date;
  endDate: Date;
  body: string;
  
  //
  userEmail: string;
  userName: string;
  userId: string;

  //
  private postEventForm: FormGroup;
  
  //
  private eventsCollection: AngularFirestoreCollection<Event>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private afs: AngularFirestore, public authService: AuthProvider) {
    //
    this.authService.user.subscribe(user => {
      this.userEmail = user.email
      this.userName = user.firstName + " " + user.name
      this.userId = user.uid
    });

    //
    this.postEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      body: [''],
    });

    //
    this.eventsCollection = this.afs.collection('events');
  }

  addEvent() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()
    
    let loader = this.loadingCtrl.create({
      content: 'Publication en cours...',
    });
    
    loader.present()
    
    
    if (this.body == undefined) {
      this.eventsCollection.add({
        'title': this.title,
        'startDate': this.startDate,
        'endDate': this.endDate,
        'body': "Aucune description n'a été fournie.",
        'author': {
          'email': this.userEmail,
          'name': this.userName,
          'uid': this.userId
        },
        'timestamp': timestamp
        }).then(_ => {
          this.dismiss();
          loader.dismiss();
        }).catch(error => {
          loader.dismiss();
            
          let alert = this.alertCtrl.create({
            title: 'Oups !',
            message: "Une erreur est survenue lors de la tentative de publication de l'évènement : " + error,
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            });
            
            alert.present();
          });
        } else {
          this.eventsCollection.add({
            'title': this.title,
            'startDate': this.startDate,
            'endDate': this.endDate,
            'body': this.body,
            'author': {
              'email': this.userEmail,
              'name': this.userName,
              'uid': this.userId
            },
            'timestamp': timestamp
          }).then(_ => {
            this.dismiss();
            loader.dismiss();
          }).catch(error => {
            let alert = this.alertCtrl.create({
              title: 'Oups !',
              message: "Une erreur est survenue lors de la tentative de publication de l'évènement : " + error,
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            });
            
            alert.present();
          });
        }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
