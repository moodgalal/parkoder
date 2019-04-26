import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranshesPage } from './branshes';

@NgModule({
  declarations: [
    BranshesPage,
  ],
  imports: [
    IonicPageModule.forChild(BranshesPage),
  ],
  exports: [
    BranshesPage
  ]
})
export class BranshesPageModule {}
