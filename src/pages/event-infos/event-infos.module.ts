import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventInfosPage } from './event-infos';

@NgModule({
  declarations: [
    EventInfosPage,
  ],
  imports: [
    IonicPageModule.forChild(EventInfosPage),
  ],
})
export class EventInfosPageModule {}
