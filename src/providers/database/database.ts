import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController, ToastController } from 'ionic-angular';

//
import 'rxjs/add/operator/map';

//
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//
import { New } from './../../models/New';
import { Event } from './../../models/Event';
import { User } from './../../models/User';

@Injectable()
export class DatabaseProvider {
  //
  newsCollection: AngularFirestoreCollection<New>;

  news: Observable<New[]>;

  newDoc: AngularFirestoreDocument<New>;
  new: Observable<New>;

  //
  upComingEventsCollection: AngularFirestoreCollection<Event>;
  pastEventsCollection: AngularFirestoreCollection<Event>;

  upComingEvents: Observable<Event[]>;
  pastEvents: Observable<Event[]>;

  eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;

  //
  studentsCollection: AngularFirestoreCollection<User>;
  students: Observable<User[]>;

  mentorsCollection: AngularFirestoreCollection<User>;
  mentors: Observable<User[]>;

  constructor(private afs: AngularFirestore, private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  //
  getNews() {  
    this.newsCollection = this.afs.collection('news', ref => {
      return ref.orderBy('timestamp', 'desc');
    });

    this.news = this.newsCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as New;
        const id = snapshot.payload.doc.id;

        return { id, ...data };
      })
    });

    return this.news;
  }

  getUpComingEvents() {
    this.upComingEventsCollection = this.afs.collection('events', ref => {
      return ref.where('past', '==', false).orderBy('timestamp', 'desc');
    });;

    this.upComingEvents = this.upComingEventsCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as Event;
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.upComingEvents;
  }

  getPastEvents() {
    this.pastEventsCollection = this.afs.collection('events', ref => {
      return ref.where('past', '==', true).orderBy('timestamp', 'desc');
    });

    this.pastEvents = this.pastEventsCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as Event;
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.pastEvents;
  }

  getStudents() {
    this.studentsCollection = this.afs.collection('users', ref => {
      return ref.where('role', '==', 'junior_mentor').orderBy("name");
    });

    this.students = this.studentsCollection.valueChanges();

    return this.students;
  }

  getMentors() {
    this.mentorsCollection = this.afs.collection('users', ref => {
      return ref.where('role', '==', 'mentor').orderBy("name");
    });

    this.mentors = this.mentorsCollection.valueChanges();

    return this.mentors;
  }

  //
  deleteNew(id: string) {
    let alert = this.alertCtrl.create({
      title: 'Supprimer la nouvelle ?',
      message: 'Êtes-vous sûrs de vouloir supprimer la nouvelle ? Cette action est irréversible.',
      buttons: [
        {
          text: 'Non',
          role: 'cancel'
        },
        {
          text: 'Oui',
          handler: data => {
            this.newDoc = this.afs.doc('news/' + id);
            this.newDoc.delete()
              .then(_ => {
                let toast = this.toastCtrl.create({
                  message: 'La nouvelle a été supprimée avec succès.',
                  duration: 2000,
                  showCloseButton: false
                });

                toast.present();
              })
              .catch(error => {
                let alert = this.alertCtrl.create({
                  title: 'Oups !',
                  message: 'Une erreur est survenue lors de la tentative de suppression de la nouvelle : ' + error,
                  buttons: [{
                    text: 'Ok',
                    role: 'cancel'
                  }]
                });
          
                alert.present();
              });
          }
        }
      ]
    });

    alert.present();
  }

  editNew(id: string, newObject: New) {
    this.newDoc = this.afs.doc('news/' + id);
    return this.newDoc.update(newObject);
  }

  deleteEvent(id) {

  }
}
