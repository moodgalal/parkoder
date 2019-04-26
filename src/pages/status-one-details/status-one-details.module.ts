import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusOneDetailsPage } from './status-one-details';
import { ComponentsSharedModule } from '../../components/component.module';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    StatusOneDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusOneDetailsPage),
    ComponentsSharedModule,
    PipesModule
  ],
  exports: [
    StatusOneDetailsPage
  ]
})
export class StatusOneDetailsPageModule {}
