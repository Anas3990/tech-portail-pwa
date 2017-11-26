import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancesPage } from './attendances';

@NgModule({
  declarations: [
    AttendancesPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendancesPage),
  ],
})
export class AttendancesPageModule {}
