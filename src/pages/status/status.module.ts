import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusPage } from './status';
import {ComponentsSharedModule} from "../../components/component.module";

@NgModule({
  declarations: [
    StatusPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusPage),
    ComponentsSharedModule
  ],
  exports: [
    StatusPage
  ]
})
export class StatusPageModule {}
