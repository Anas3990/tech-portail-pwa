import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

//
import { DatabaseProvider } from './../../providers/database/database';

//
import { Attendance } from './../../models/Attendance';

@IonicPage()
@Component({
  selector: 'page-attendances',
  templateUrl: 'attendances.html',
})
export class AttendancesPage {
  //
  attendances: Attendance[]

  //
  eventId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private dbService: DatabaseProvider) {
    //
    this.eventId = this.navParams.get('eventId');
  }

  ionViewDidLoad() {
    this.dbService.getAttendances(this.eventId).subscribe(attendances => {
      this.attendances = attendances;
    })

    console.log(this.eventId)
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }
}
