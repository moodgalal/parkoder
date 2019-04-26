import { Component, ViewChild } from '@angular/core';
import {AlertController, ModalController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from "@ionic/storage";
import {DamagesDrawPage} from "../pages/damages-draw/damages-draw";
import {FCM} from "@ionic-native/fcm";
import {NotificationProvider} from "../providers/notification/notification";
import { PublicShared } from '../models/public-shared';

@Component({
  templateUrl: 'app.html' ,

})
export class MyApp
{

  @ViewChild("mycontent") nav: NavController;

     rootPage:any = "login";
    userName : string;
    userToken : string;
    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                // private storage : NativeStorage,
                private storage : Storage,
                public alertCtrl: AlertController,
                private modalCtrl : ModalController,
                private fcm : FCM,
                private service : NotificationProvider
               ) {

    platform.ready().then(() => {
      this.handleNotificationArrival();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToCustomers() {
      this.nav.push("CustomersPage");
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout ?',
      message: 'Do you want to logout ?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.storage.clear()
              .then(() => {
                this.nav.setRoot("login");
              })

          }
        }
      ]
    });
    confirm.present();
  }

  damages()
  {
    this.modalCtrl.create(DamagesDrawPage)
      .present()
  }

 notification()
 {
   this.nav.push("notifications")
 }

  goToProfile()
  {
    this.nav.push("profile")
  }

  sendPush(token , senderToken , senderEmail,  message : string , type : string , isHandover : boolean): void
  {
    let model = {
      "senderToken": senderToken,
      "senderEmail" : senderEmail,
      "type": type,
      "message" : `${message}`
    };

    if(isHandover)
    {
      this.service.sendHandoverNotification(token, model)
        .subscribe((res)=>
        {
          this.alertCtrl.create({
            title : "Done",
            message : "Message sent !",
            buttons : ["Ok"]
          }).present();
        });
    }
    else
    {
      this.service.sendAmountNotification(token , model)
        .subscribe((res)=>
        {
          this.alertCtrl.create({
            title : "Done",
            message : "Message sent !",
            buttons : ["Ok"]
          }).present();
        });
    }
  }

  handleNotificationArrival()
  {
    console.log("all set and listening now");

            this.userName = PublicShared.CurrentUserName;
            this.userToken = PublicShared.CurrentUserToken;
            this.fcm.onNotification().subscribe((res) =>
            {
              console.log(res);

              if(res.isHandover)
              {
                this.handoverNotificationMessage(res)
              }
              else
              {
                this.amountNotifocationMessage(res);
              }
            });

            this.fcm.onTokenRefresh()
              .subscribe((token)=>
              {
                let model =
                  {
                    UserName:this.userName,
                    Token: token
                  };

                this.service.setUserToken(model)
                  .subscribe(()=>
                  {
                    this.userToken = token;
                    PublicShared.CurrentUserToken = token;
                    console.log("Token Updated")
                  })
              });
  }

  amountNotifocationMessage(res)
  {
    if(res.type == "sender")
    {
      this.alertCtrl.create({
        title : "Amount Notification !",
        subTitle : `From: ${res.senderEmail}`,
        message : `${res.message}\n Amount: ${res.amount}`,
        buttons : [
          {
            text : "Accept",
            handler : ()=>
            {
              this.sendPush(res.senderToken , this.userToken , this.userName,  "I'll take it." , "reciever", false)
            }
          },
          {
            text : "Decline",
            handler : ()=>
            {
              this.sendPush(res.senderToken ,  this.userToken , this.userName,  "I can't take it now" , "reciever", false)
            }
          }
        ]
      }).present()
    }
    else
    {
      this.alertCtrl.create({
        title : "Done",
        subTitle : `From: ${res.senderEmail}`,
        message : res.message,
        buttons : ["Ok"]
      }).present();
    }
  }

  handoverNotificationMessage(res)
  {
    if(res.type == "sender")
    {
      this.alertCtrl.create({
        title : `Notification From: ${res.senderEmail}`,
        subTitle : `${res.message}`,
        message : `Car: ${res.barcode}`,
        buttons : [
          {
            text : "Show Car",
            handler : ()=>
            {
              this.modalCtrl.create("handover-info", {barcode : res.barcode , token : res.senderToken}).present()
            }
          },
          {
            text : "Decline",
            handler : ()=>
            {
              this.sendPush(res.senderToken ,  PublicShared.CurrentUserToken , PublicShared.CurrentUserName,  "I can't take it now" , "reciever", true)
            }
          }
        ]
      }).present()
    }
    else
    {
      this.alertCtrl.create({
        title : "Done",
        subTitle : `From: ${res.senderEmail}`,
        message : res.message,
        buttons : ["Ok"]
      }).present();
    }
  }
}
