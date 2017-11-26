import * as firebase from 'firebase';

export interface Event {
    id?: string
    author: Object
    title?: string
    date?: Date
    startDate?: Date
    endDate?: Date
    body?: string
    timestamp: firebase.firestore.FieldValue
}