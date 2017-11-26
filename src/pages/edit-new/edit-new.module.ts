import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNewPage } from './edit-new';

@NgModule({
  declarations: [
    EditNewPage,
  ],
  imports: [
    IonicPageModule.forChild(EditNewPage),
  ],
})
export class EditNewPageModule {}
