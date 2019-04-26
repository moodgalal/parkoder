import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectcountryPage } from './selectcountry';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    SelectcountryPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectcountryPage),
    PipesModule
  ],
  exports: [
    SelectcountryPage
  ]
})
export class SelectcountryPageModule {}
