import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HandoverInfoModalPage } from './handover-info-modal';
import {PipesModule} from "../../pipes/pipes.module";
import {ComponentsSharedModule} from "../../components/component.module";

@NgModule({
  declarations: [
    HandoverInfoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HandoverInfoModalPage),
    PipesModule,
    ComponentsSharedModule
  ],
  exports: [
    HandoverInfoModalPage
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class HandoverInfoModalPageModule {}
