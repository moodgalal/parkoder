import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusZeroDetailsPage } from './status-zero-details';
import { PipesModule}  from '../../pipes/pipes.module' ;
import {ComponentsSharedModule} from '../../components/component.module';

@NgModule({
  declarations: [
    StatusZeroDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusZeroDetailsPage),
    PipesModule,
    ComponentsSharedModule
  ],
  exports: [
    StatusZeroDetailsPage
  ]
})
export class StatusZeroDetailsPageModule {}
