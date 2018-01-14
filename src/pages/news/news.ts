import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//
import { ModalController } from 'ionic-angular';

//
import { AddNewPage } from './../add-new/add-new';
import { EditNewPage } from './../edit-new/edit-new';
import { NewInfosPage } from './../new-infos/new-infos';

//
import { DatabaseProvider } from './../../providers/database/database';
import { AuthProvider } from './../../providers/auth/auth';

//
import { New } from './../../models/New';
import { User } from './../../models/User';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news: New[];

  //
  user: User;

  //
  newInfosPage: any;
  editNewPage: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dbService: DatabaseProvider, public authService: AuthProvider) {
    this.newInfosPage = NewInfosPage;
  }

  ionViewWillLoad() {
    this.dbService.getNews().subscribe(news => {
      this.news = news;
    });

    //
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  showAddNewModal() {
    let addNewModal = this.modalCtrl.create(AddNewPage);
    addNewModal.present();
  }

  showEditNewModal() {
    let editNewModal = this.modalCtrl.create(EditNewPage);
    editNewModal.present();
  }
}
