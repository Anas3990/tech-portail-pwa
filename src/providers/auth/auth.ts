import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

// Permet d'utiliser les fonctions d'AngularFire afin de pouvoir authentifier un utilisateur
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {
  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private afAuth: AngularFireAuth) {}

  // Fonction qui sert à connecter un utilisateur à Firebase
  async signInWith(email: string, password: string) {
    let loader = this.loadingCtrl.create({
      content: "Connexion en cours...",
    });
    loader.present();

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(_ => {
      //
      loader.dismiss();
    })
    .catch(error => {
      loader.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Oups !',
        message: 'Une erreur est survenue lors de la tentative de connexion !',
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }]
      });

      console.warn(error);
      alert.present();
    })
  }
  
  // Fonction qui permet à d'envoyer un courriel de réinitialisation de mot passe
  sentPasswordResetEmail() {
    let alert = this.alertCtrl.create({
      title: 'Mot de passe oublié ?',
      message: 'Veuillez entrer votre addresse courriel dans le champs ci-dessous.',
      inputs: [
        {
          name: 'email',
          placeholder: 'Courriel'
        }
      ],
      buttons: [
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
                  message: 'Une erreur est survenue lors de la tentative de connexion !',
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
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
      ]
    });

    alert.present();
  }
}
