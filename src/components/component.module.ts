import {NgModule, NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {DurationComponent} from './duration/duration';
import {CustomerComponent} from './customer/customer';
import {PaymentComponent} from './payment/payment';
import { TransactionComponent } from './transaction/transaction';
import { PipesModule } from '../pipes/pipes.module'

@NgModule({
    declarations : [
      DurationComponent,
      CustomerComponent,
      PaymentComponent,
      TransactionComponent
    ],
    imports : [IonicModule, PipesModule ],
    exports : [
      DurationComponent,
      CustomerComponent,
      PaymentComponent,
      TransactionComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})

export class ComponentsSharedModule {}
