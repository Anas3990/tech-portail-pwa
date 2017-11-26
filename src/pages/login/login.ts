import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// Permet d'utiliser les fonctions d'AngularFire afin de pouvoir authentifier un utilisateur
import { AngularFireAuth } from 'angularfire2/auth';

//
import { FCM } from '@ionic-native/fcm';

//
import { TabsPage } from './../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  template: `
  <ion-content padding style="background-color:#221E1F;">
    <form [formGroup]="loginForm" (ngSubmit)="signInWith(email, password)" class="center-form">
      <div>
        <img src="assets/imgs/T4K_ROUND.png" style="display: block; width: 60%; height: auto; margin-left: auto; margin-right: auto;" />
      </div>

      <ion-list>  
        <ion-item class="top-input">
          <ion-input type="email" placeholder="Courriel" [(ngModel)]="email" name="email" formControlName="email"></ion-input>
        </ion-item>

        <ion-item class="bottom-input">
          <ion-input type="password" placeholder="Mot de passe" [(ngModel)]="password" name="password" formControlName="password"></ion-input>
        </ion-item>
      </ion-list>

      <div class="spacer" style="width: 290px; height: 10px;"></div>

      <button ion-button type="submit" [disabled]="!loginForm.valid" color="vivid-yellow" block>
        Se connecter
      </button>

      <div class="spacer" style="width: 300px; height: 10px;"></div>

      <button ion-button type="button" (click)="sendPasswordResetEmail()" style="color:#F0AD4E;" clear block>
        Mot de passe oublié ?
      </button>
    </form>
  </ion-content>
`
})
export class LoginPage {
  //
  email: string;
  password: string;

  //
  private loginForm: FormGroup;

  constructor(private fcm: FCM, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private afAuth: AngularFireAuth) {
    //
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Fonction qui sert à connecter un utilisateur à Firebase
  async signInWith(email: string, password: string) {
    let loader = this.loadingCtrl.create({
      content: 'Connexion en cours...',
    });

    loader.present()

    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      if (result) {
        this.fcm.subscribeToTopic("teamMembers")
          .then(_ => {
            this.navCtrl.setRoot(TabsPage);
            loader.dismiss();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    catch (error) {
      loader.dismiss();
      
      let alert = this.alertCtrl.create({
        title: 'Oups !',
        message: 'Une erreur est survenue lors de la tentative de connexion : ' + error,
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }]
      });
      
      alert.present();
    }
  }

  // Fonction qui permet à d'envoyer un courriel de réinitialisation de mot passe
  sendPasswordResetEmail() {
    let alert = this.alertCtrl.create({
      title: 'Mot de passe oublié',
      message: 'Veuillez entrer votre addresse courriel dans le champs ci-dessous.',
      inputs: [
        {
          name: 'email',
          placeholder: 'Courriel',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Envoyer',
          handler: data => {
            let loader = this.loadingCtrl.create({
              content: "Envoi du courriel en cours ...",
            });
            loader.present();

            if (data.email) {
              this.afAuth.auth.sendPasswordResetEmail(data.email)
              .then(_ => {
                loader.dismiss();

                let alert = this.alertCtrl.create({
                  title: 'Courriel envoyé !',
                  message: 'Le courriel a été envoyé avec succès !',
                  buttons: [{
                    text: 'Ok',
                    role: 'cancel'
                  }]
                });

                alert.present();
              })
              .catch(error => {
                loader.dismiss();

                let alert = this.alertCtrl.create({
                  title: 'Oups !',
                  message: "Une erreur est survenue lors de la tentative d'envoie du courriel de réinitialisation de votre mot de passe !",
                  buttons: [{
                    text: 'Ok',
                    role: 'cancel'
                  }]
                });
          
                alert.present();
              })
            } else {
              loader.dismiss();

              let alert = this.alertCtrl.create({
                title: 'Oups !',
                message: "Veuillez vous assurer d'entrer une addresse courriel !",
                buttons: [{
                  text: 'Ok',
                  role: 'cancel'
                }]
              });

              alert.present();

              return false;
            }
          }
        }
      ]
    });

    alert.present();
  }
}
