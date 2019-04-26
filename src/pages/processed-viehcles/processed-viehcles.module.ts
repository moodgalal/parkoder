import { NgModule , CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcessedViehclesPage } from './processed-viehcles';
import { PipesModule}  from '../../pipes/pipes.module' ;
import {ComponentsSharedModule} from '../../components/component.module';

@NgModule({
  declarations: [
    ProcessedViehclesPage
  ],
  imports: [
    IonicPageModule.forChild(ProcessedViehclesPage ),
    PipesModule,
    ComponentsSharedModule
  ],
  exports: [
    ProcessedViehclesPage
  ] ,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class ProcessedViehclesPageModule {}
