import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController, ToastController } from 'ionic-angular';

//
import 'rxjs/add/operator/map';

//
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

//
import { New } from './../../models/New';
import { Event } from './../../models/Event';
import { UserAttendance } from './../../models/UserAttendance';
import { Attendance } from './../../models/Attendance';
import { User } from './../../models/User';

@Injectable()
export class DatabaseProvider {
  //
  userAttendancesCollectionForUpcomingEvents: AngularFirestoreCollection<UserAttendance>;
  userAttendancesCollectionForPastEvents: AngularFirestoreCollection<UserAttendance>;

  userAttendancesForUpcomingEvents: Observable<UserAttendance[]>;
  userAttendancesForPastEvents: Observable<UserAttendance[]>;

  userAttendanceDoc: AngularFirestoreDocument<UserAttendance>
  userAttendance: Observable<UserAttendance>

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
  attendancesCollection: AngularFirestoreCollection<Attendance>;

  attendances: Observable<Attendance[]>;

  //
  studentsCollection: AngularFirestoreCollection<User>;
  students: Observable<User[]>;

  mentorsCollection: AngularFirestoreCollection<User>;
  mentors: Observable<User[]>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  getUserAttendancesForUpcomingEvents() {
    this.userAttendancesCollectionForUpcomingEvents = this.afs.collection('users').doc(this.afAuth.auth.currentUser.uid).collection('attendances', ref => {
      return ref.where('eventStartDate', '>', new Date());
    });

    this.userAttendancesForUpcomingEvents = this.userAttendancesCollectionForUpcomingEvents.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as UserAttendance;
        const id = snapshot.payload.doc.id;

        return { id, ...data };
      })
    });

    return this.userAttendancesForUpcomingEvents
  }

  getUserAttendancesForPastEvents() {
    this.userAttendancesCollectionForPastEvents = this.afs.collection('users').doc(this.afAuth.auth.currentUser.uid).collection('attendances', ref => {
      return ref.where('eventStartDate', '<', new Date());
    });

    this.userAttendancesForPastEvents = this.userAttendancesCollectionForPastEvents.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as UserAttendance;
        const id = snapshot.payload.doc.id;

        return { id, ...data };
      })
    });

    return this.userAttendancesForPastEvents
  }

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
      return ref.where('startDate', '>', new Date());
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
      return ref.where('startDate', '<', new Date());
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

  getAttendances(id) {
    this.attendancesCollection = this.afs.collection('events').doc(id).collection("attendances", ref => {
      return ref.where('present', '==', true);
    });

    this.attendances = this.attendancesCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as Attendance;
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.attendances;
  }

  getStudents() {
    this.studentsCollection = this.afs.collection('users', ref => {
      return ref.where('approved', '==', true).where('roles.mentor', '==', false).orderBy("name");
    });

    this.students = this.studentsCollection.valueChanges();

    return this.students;
  }

  getMentors() {
    this.mentorsCollection = this.afs.collection('users', ref => {
      return ref.where('approved', '==', true).where('roles.mentor', '==', true).orderBy("name");
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
    let alert = this.alertCtrl.create({
      title: "Supprimer l'évènement ?",
      message: "Êtes-vous sûrs de vouloir supprimer cet évènement ? Cette action est irréversible.",
      buttons: [
        {
          text: 'Non',
          role: 'cancel'
        },
        {
          text: 'Oui',
          handler: data => {
            this.newDoc = this.afs.doc('events/' + id);
            this.newDoc.delete()
              .then(_ => {
                let toast = this.toastCtrl.create({
                  message: "L'évènement a été supprimé avec succès.",
                  duration: 2000,
                  showCloseButton: false
                });

                toast.present();
              })
              .catch(error => {
                let alert = this.alertCtrl.create({
                  title: 'Oups !',
                  message: "Une erreur est survenue lors de la tentative de suppression de l'évènement : " + error,
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
}
