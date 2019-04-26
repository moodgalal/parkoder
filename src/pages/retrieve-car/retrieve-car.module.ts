import { NgModule , CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetrieveCarPage } from './retrieve-car';
import { PipesModule}  from '../../pipes/pipes.module' ;


@NgModule({
  declarations: [
    RetrieveCarPage,
  ],
  imports: [
    IonicPageModule.forChild(RetrieveCarPage),
    PipesModule
  ],
  exports: [
    RetrieveCarPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]

})
export class RetrieveCarPageModule {}
