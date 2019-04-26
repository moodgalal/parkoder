import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorsPage } from './colors';
import {ComponentsSharedModule} from "../../components/component.module";

@NgModule({
  declarations: [
    ColorsPage,
  ],
  imports: [
    IonicPageModule.forChild(ColorsPage),
    ComponentsSharedModule
  ],
  exports: [
    ColorsPage
  ]
})
export class ColorsPageModule {}
