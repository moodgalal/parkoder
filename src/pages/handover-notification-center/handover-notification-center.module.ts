import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HandoverNotificationCenterPage } from './handover-notification-center';

@NgModule({
  declarations: [
    HandoverNotificationCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(HandoverNotificationCenterPage),
  ],
  exports: [
    HandoverNotificationCenterPage
  ]
})
export class HandoverNotificationCenterPageModule {}
