import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { AddNewPage } from './../add-new/add-new';

//
import { DatabaseProvider } from './../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news: any[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private dbService: DatabaseProvider) {}

  ionViewDidLoad() {
    this.dbService.getNews().subscribe(news => {
      this.news = news;
    })
  }

  showAddNewModal() {
    let addNewModal = this.modalCtrl.create(AddNewPage);
    addNewModal.present();
  }
}
