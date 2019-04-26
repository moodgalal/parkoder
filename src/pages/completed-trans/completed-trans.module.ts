import { NgModule,CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompletedTransPage } from './completed-trans';
import { PipesModule}  from '../../pipes/pipes.module' ;
import {ComponentsSharedModule} from '../../components/component.module';

@NgModule({
  declarations: [
    CompletedTransPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletedTransPage),
    PipesModule,
    ComponentsSharedModule
  ],
  exports: [
    CompletedTransPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]

})
export class CompletedTransPageModule {}
