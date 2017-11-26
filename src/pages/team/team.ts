import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, AlertController  } from 'ionic-angular';

// Permet d'utiliser les fonctions d'AngularFire afin de pouvoir authentifier un utilisateur
import { AngularFireAuth } from 'angularfire2/auth';

//
import { FCM } from '@ionic-native/fcm';

//
import { DatabaseProvider } from './../../providers/database/database';

//
import { UserInfosPage } from './../user-infos/user-infos';
import { LoginPage } from './../login/login';

//
import { User } from '../../models/User';

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
  usersList: string = "junior_mentors";

  //
  students: User[];
  mentors: User[];

  //
  userInfosPage: any;

  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private fcm: FCM, private afAuth: AngularFireAuth, private dbService: DatabaseProvider) {
    this.userInfosPage = UserInfosPage
  }

  ionViewWillLoad() {
    this.dbService.getStudents().subscribe(students => {
      this.students = students;
    });

    this.dbService.getMentors().subscribe(mentors => {
      this.mentors = mentors;
    });
  }

  // Fonction qui permet de déconnecter un utilisateur
  logout() {
    let alert = this.alertCtrl.create({
      title: 'Se déconnecter',
      message: 'Êtes-vous sûrs de vouloir vous déconnecter du Tech Portail ?',
      buttons: [
        {
        text: 'Non',
        role: 'cancel'
      },
      {
        text: 'Oui',
        handler: data => {
          this.afAuth.auth.signOut()
          .then(_ => {
            this.fcm.unsubscribeFromTopic('teamMembers')
              .then(_ => {
                this.app.getRootNav().setRoot(LoginPage);
              })
              .catch(error => {
                console.log(error)
              });
          })
          .catch(error => {
            let alert = this.alertCtrl.create({
              title: 'Oups !',
              message: 'Une erreur est survenue lors de la tentative de déconnexion :' + error,
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            });
      
            alert.present();
          })
        }
      }
    ]
    });

    alert.present();
  }
}
