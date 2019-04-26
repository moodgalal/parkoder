import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCustomerPage } from './add-customer';

@NgModule({
  declarations: [
    AddCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCustomerPage),
  ],
  exports: [
    AddCustomerPage
  ]
})
export class AddCustomerPageModule {}
