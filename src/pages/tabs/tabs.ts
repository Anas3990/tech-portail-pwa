import { Component } from '@angular/core';

import { DashboardPage } from '../dashboard/dashboard';
import { NewsPage } from '../news/news';
import { EventsPage } from '../events/events';
import { TeamPage } from '../team/team';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  dashboard = DashboardPage;
  news = NewsPage;
  events = EventsPage;
  team = TeamPage

  constructor() {

  }
}
