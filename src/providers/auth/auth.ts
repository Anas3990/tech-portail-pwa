import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Permet d'utiliser les fonctions d'AngularFire afin de pouvoir authentifier un utilisateur
import { AngularFireAuth } from 'angularfire2/auth';

//
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

//
import { User } from '../../models/User';

@Injectable()
export class AuthProvider {

  //
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState
    .switchMap(user => {
      if (user) {
        return this.afs.doc<User>('users/' + user.uid).valueChanges();
      } else {
        return Observable.of(null);
      }
    })
  }
}
