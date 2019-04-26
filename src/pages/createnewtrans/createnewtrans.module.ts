import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatenewtransPage } from './createnewtrans';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CreatenewtransPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatenewtransPage),
    PipesModule
  ],
  exports: [
    CreatenewtransPage
  ]
})
export class CreatenewtransPageModule {}
