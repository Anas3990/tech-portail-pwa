import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

//
import { AddEventPage } from './../add-event/add-event';
import { EventInfosPage } from './../event-infos/event-infos';

//
import { DatabaseProvider } from './../../providers/database/database';

//
import { Event } from './../../models/Event';

@IonicPage()
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
  eventInfosPage: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dbService: DatabaseProvider) {
    this.eventInfosPage = EventInfosPage;
  }

  ionViewWillLoad() {
    this.dbService.getUpComingEvents().subscribe(upComingEvents => {
      this.upComingEvents = upComingEvents;
    });

    this.dbService.getPastEvents().subscribe(pastEvents => {
      this.pastEvents = pastEvents;
    });
  }

  showAddEventModal() {
    let addNewModal = this.modalCtrl.create(AddEventPage);
    addNewModal.present();
  }
}
