import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddVehiclePage } from './add-vehicle';

@NgModule({
  declarations: [
    AddVehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(AddVehiclePage),
  ],
  exports: [
    AddVehiclePage
  ]
})
export class AddVehiclePageModule {}
