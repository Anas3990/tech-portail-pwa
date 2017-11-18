import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//
import { DatabaseProvider } from './../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
  usersList: string = "junior_mentors";

  //
  students: any[];
  mentors: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbService: DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.dbService.getStudents().subscribe(students => {
      this.students = students;
    });

    this.dbService.getMentors().subscribe(mentors => {
      this.mentors = mentors;
    });
  }

}
