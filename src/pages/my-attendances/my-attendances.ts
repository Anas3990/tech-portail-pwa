import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//
import { DatabaseProvider } from './../../providers/database/database';

//
import { UserAttendance } from './../../models/UserAttendance';

@Component({
  selector: 'page-my-attendances',
  templateUrl: 'my-attendances.html',
})
export class MyAttendancesPage {
  userAttendancesList: string = "upComing"

  userAttendancesForUpcomingEvents: UserAttendance[];
  userAttendancesForPastEvents: UserAttendance[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: DatabaseProvider) {
  }

  ionViewWillLoad() {
    this.dbService.getUserAttendancesForUpcomingEvents().subscribe(userAttendanesForUpcomingEvents => {
      this.userAttendancesForUpcomingEvents = userAttendanesForUpcomingEvents;
    });

    this.dbService.getUserAttendancesForPastEvents().subscribe(userAttendancesForPastEvents => {
      this.userAttendancesForPastEvents = userAttendancesForPastEvents
    });
  }

}
