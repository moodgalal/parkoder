import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {FormsModule } from '@angular/forms'
import {HttpModule} from "@angular/http";
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule} from '@ionic/storage';
import {FIREBASE_CONFIG} from './app.firebase.config';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule } from 'angularfire2/auth';
import {CloudSettings , CloudModule} from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { CarsProvider } from '../providers/cars/cars';
import { Printer} from '@ionic-native/printer';
import { AndroidPermissions} from '@ionic-native/android-permissions';
import { CanvasDrawComponent } from '../components/canvas-draw/canvas-draw';
import {DamagesDrawPage} from "../pages/damages-draw/damages-draw";
import {FCM} from "@ionic-native/fcm";
import {NotificationProvider} from "../providers/notification/notification";
import { PublicShared } from '../models/public-shared';
import { Camera } from "@ionic-native/camera";

const cloudSettings : CloudSettings =
    {
      'core': {
        'app_id': 'fac354ca'
      }
    };
@NgModule({
  declarations: [
        MyApp,
    DamagesDrawPage,
    CanvasDrawComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule ,
    HttpModule
  ],
  bootstrap: [IonicApp],

  entryComponents: [
        MyApp,
    DamagesDrawPage
  ],
  providers: [
      StatusBar,
      SplashScreen,
      NativeStorage,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      Camera,
      CarsProvider,
      PublicShared,
      Printer,
      AndroidPermissions,
      FCM,
    NotificationProvider
  ]
})
export class AppModule {}
