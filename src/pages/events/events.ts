import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//
import { DatabaseProvider } from './../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  eventsList: string = "upComing";

  //
  upComingEvents: any[];
  pastEvents: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbService: DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.dbService.getUpComingEvents().subscribe(upComingEvents => {
      this.upComingEvents = upComingEvents;
    });

    this.dbService.getPastEvents().subscribe(pastEvents => {
      this.pastEvents = pastEvents;
    });
  }

}
