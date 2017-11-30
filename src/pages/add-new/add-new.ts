import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

//
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//
import { AuthProvider } from '../../providers/auth/auth';

//
import { New } from '../../Models/New';

@IonicPage()
@Component({
  selector: 'page-add-new',
  templateUrl: 'add-new.html',
  template: `
  <ion-header>
  
    <ion-navbar color="gray">
      <ion-title>Ajouter une nouvelle</ion-title>
  
      <ion-buttons start>
        <button ion-button (click)="dismiss()">
          <ion-icon name="md-close"></ion-icon>
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
  
      <form [formGroup]="postNewForm" (ngSubmit)="addNew()">
        <ion-item>
            <ion-label fixed>Titre</ion-label>
            <ion-input type="text" [(ngModel)]="title" name="title" formControlName="title"></ion-input>
          </ion-item>
        
          <ion-item>
            <ion-textarea placeholder="Description" [(ngModel)]="body" name="body" formControlName="body"></ion-textarea>
          </ion-item>
  
          <div class="spacer" style="height:30px;" id="login-spacer1"></div>
  
          <button ion-button type="submit" [disabled]="!postNewForm.valid" color="gray" block clear>Ajouter la nouvelle</button>
      </form>
    </ion-list>
  </ion-content>
`
})
export class AddNewPage {
  //
  title: string;
  body: string;

  //
  userEmail: string;
  userName: string;
  userId: string;

  //
  private postNewForm: FormGroup;

  //
  private newsCollection: AngularFirestoreCollection<New>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private afs: AngularFirestore, public authService: AuthProvider) {
    //
    this.authService.user.subscribe(user => {
      this.userEmail = user.email
      this.userName = user.firstName + " " + user.name
      this.userId = user.uid
    });

    //
    this.postNewForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: [''],
    });

    // 
    this.newsCollection = this.afs.collection('news');
  }

  addNew() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp()

    let loader = this.loadingCtrl.create({
      content: 'Publication en cours...',
    });

    loader.present()


    if (this.body == undefined) {
      this.newsCollection.add({
        'title': this.title,
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
          message: 'Une erreur est survenue lors de la tentative de publication de la nouvelle : ' + error,
          buttons: [{
            text: 'Ok',
            role: 'cancel'
          }]
        });
        
        alert.present();
      });
    } else {
      this.newsCollection.add({
        'title': this.title,
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
        loader.dismiss();
        
        let alert = this.alertCtrl.create({
          title: 'Oups !',
          message: 'Une erreur est survenue lors de la tentative de publication de la nouvelle :' + error,
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
