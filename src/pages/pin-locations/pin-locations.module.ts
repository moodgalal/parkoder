import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinLocationsPage } from './pin-locations';
import {ComponentsSharedModule} from '../../components/component.module';
@NgModule({
  declarations: [
    PinLocationsPage,
  ],
  imports: [
    IonicPageModule.forChild(PinLocationsPage),
    ComponentsSharedModule
  ],
  exports: [
    PinLocationsPage
  ]
})
export class PinLocationsPageModule {}
