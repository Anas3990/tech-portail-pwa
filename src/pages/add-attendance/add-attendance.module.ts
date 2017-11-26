import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAttendancePage } from './add-attendance';

@NgModule({
  declarations: [
    AddAttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(AddAttendancePage),
  ],
})
export class AddAttendancePageModule {}
