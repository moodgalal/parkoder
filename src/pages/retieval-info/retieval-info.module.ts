import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetievalInfoPage } from './retieval-info';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    RetievalInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RetievalInfoPage),
    PipesModule
  ],
  exports: [
    RetievalInfoPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class RetievalInfoPageModule {}
