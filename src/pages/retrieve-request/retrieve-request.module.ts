import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetrieveRequestPage } from './retrieve-request';
import { PipesModule}  from '../../pipes/pipes.module' ;

@NgModule({
  declarations: [
    RetrieveRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(RetrieveRequestPage),
    PipesModule
  ],
  exports: [
    RetrieveRequestPage
  ]
})
export class RetrieveRequestPageModule {}
