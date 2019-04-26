import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InProcessDetailsPage } from './out-process-details';
import { PipesModule}  from '../../pipes/pipes.module' ;

@NgModule({
  declarations: [
    InProcessDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InProcessDetailsPage),
    PipesModule
  ],
  exports: [
    InProcessDetailsPage
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class InProcessDetailsPageModule {}
