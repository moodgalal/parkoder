import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadonlyDetailsPage } from './readonly-details';
import {ComponentsSharedModule} from "../../components/component.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ReadonlyDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadonlyDetailsPage),
    PipesModule,
    ComponentsSharedModule
  ],
  exports: [
    ReadonlyDetailsPage
  ]
})
export class ReadonlyDetailsPageModule {}
