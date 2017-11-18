import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//
import 'rxjs/add/operator/map';

//
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class DatabaseProvider {
  //
  newsCollection: AngularFirestoreCollection<any>;
  news: Observable<any[]>;

  newDoc: AngularFirestoreDocument<any>;
  new: Observable<any>;

  //
  upComingEventsCollection: AngularFirestoreCollection<any>;
  pastEventsCollection: AngularFirestoreCollection<any>;

  upComingEvents: Observable<any[]>;
  pastEvents: Observable<any[]>;

  eventDoc: AngularFirestoreDocument<any>;
  event: Observable<any>;

  //
  studentsCollection: AngularFirestoreCollection<any>;
  students: Observable<any[]>;

  studentDoc: AngularFirestoreDocument<any>;
  student: Observable<any>;

  mentorsCollection: AngularFirestoreCollection<any>;
  mentors: Observable<any[]>;

  mentorDoc: AngularFirestoreDocument<any>;
  mentor: Observable<any>;

  constructor(private afs: AngularFirestore) {}

  //
  getNews() {  
    this.newsCollection = this.afs.collection('news', ref => {
      return ref.orderBy('timestamp', 'desc');
    });

    this.news = this.newsCollection.snapshotChanges().map(array => {
      return array.map(snapshot => {
        const data = snapshot.payload.doc.data() as any;
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
        const data = snapshot.payload.doc.data() as any;
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
        const data = snapshot.payload.doc.data() as any;
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      })
    });

    return this.pastEvents;
  }

  //
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
}
