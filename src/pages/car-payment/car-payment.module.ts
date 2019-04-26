import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarPaymentPage } from './car-payment';
import { PipesModule}  from '../../pipes/pipes.module' ;


@NgModule({
  declarations: [
    CarPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(CarPaymentPage),
    PipesModule
  ],
  exports: [
    CarPaymentPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]

})
export class CarPaymentPageModule {}
