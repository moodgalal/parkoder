import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypesPage } from './types';
import {ComponentsSharedModule} from "../../components/component.module";

@NgModule({
  declarations: [
    TypesPage,
  ],
  imports: [
    IonicPageModule.forChild(TypesPage),
    ComponentsSharedModule
  ],
  exports: [
    TypesPage
  ]
})
export class TypesPageModule {}
