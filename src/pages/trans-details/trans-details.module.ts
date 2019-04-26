import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransDetailsPage } from './trans-details';
import { PipesModule}  from '../../pipes/pipes.module' ;
import { ComponentsSharedModule } from '../../components/component.module';


@NgModule({
  declarations: [
    TransDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransDetailsPage),
    PipesModule,
    ComponentsSharedModule
  ],
  exports: [
    TransDetailsPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]


})
export class TransDetailsPageModule {}
