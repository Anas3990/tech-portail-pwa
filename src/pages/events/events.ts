import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

//
import { AddEventPage } from './../add-event/add-event';
import { EventInfosPage } from './../event-infos/event-infos';

//
import { DatabaseProvider } from './../../providers/database/database';
import { AuthProvider } from './../../providers/auth/auth';

//
import { Event } from './../../models/Event';
import { User } from './../../models/User';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  eventsList: string = "upComing";

  //
  upComingEvents: Event[];
  pastEvents: Event[];

  //
  user: User;

  //
  eventInfosPage: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dbService: DatabaseProvider, public authService: AuthProvider) {
    this.eventInfosPage = EventInfosPage;
  }

  ionViewWillLoad() {
    this.dbService.getUpComingEvents().subscribe(upComingEvents => {
      this.upComingEvents = upComingEvents;
    });

    this.dbService.getPastEvents().subscribe(pastEvents => {
      this.pastEvents = pastEvents;
    });

    //
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  showAddEventModal() {
    let addNewModal = this.modalCtrl.create(AddEventPage);
    addNewModal.present();
  }
}
