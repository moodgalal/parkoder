import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomersPage } from './customers';

@NgModule({
  declarations: [
    CustomersPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomersPage),
  ],
  exports: [
    CustomersPage
  ]
})
export class CustomersPageModule {}
