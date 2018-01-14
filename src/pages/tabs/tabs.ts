import { Component } from '@angular/core';

import { DashboardPage } from '../dashboard/dashboard';
import { MyAttendancesPage } from './../my-attendances/my-attendances';
import { NewsPage } from '../news/news';
import { EventsPage } from '../events/events';
import { TeamPage } from '../team/team';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  dashboard = DashboardPage;
  myAttendances = MyAttendancesPage
  news = NewsPage;
  events = EventsPage;
  team = TeamPage

  constructor() {

  }
}
