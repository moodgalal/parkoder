import { NgModule , CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsPage } from './transactions';
import { PipesModule}  from '../../pipes/pipes.module' ;
import {ComponentsSharedModule} from '../../components/component.module';

@NgModule({
  declarations: [
    TransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionsPage),
    PipesModule,
    ComponentsSharedModule
  ],
  exports: [
    TransactionsPage
  ] ,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class TransactionsPageModule {}
