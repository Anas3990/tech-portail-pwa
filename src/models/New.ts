import * as firebase from 'firebase';

export interface New {
    id?: string
    author: Object
    title: string
    body?: string
    timestamp: firebase.firestore.FieldValue
}