import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandsPage } from './brands';
import {ComponentsSharedModule} from '../../components/component.module';

@NgModule({
  declarations: [
    BrandsPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandsPage),
    ComponentsSharedModule
  ],
  exports: [
    BrandsPage
  ]
})
export class BrandsPageModule {}
