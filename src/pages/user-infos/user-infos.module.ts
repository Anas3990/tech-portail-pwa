import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfosPage } from './user-infos';

@NgModule({
  declarations: [
    UserInfosPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInfosPage),
  ],
})
export class UserInfosPageModule {}
