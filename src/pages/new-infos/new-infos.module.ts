import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewInfosPage } from './new-infos';

@NgModule({
  declarations: [
    NewInfosPage,
  ],
  imports: [
    IonicPageModule.forChild(NewInfosPage),
  ],
})
export class NewInfosPageModule {}
