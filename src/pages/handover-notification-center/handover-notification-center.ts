import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PublicShared} from "../../models/public-shared";
import {NotificationProvider} from "../../providers/notification/notification";
import {DomSanitizer} from "@angular/platform-browser";


@IonicPage({name:"handover-notification-center"})
@Component({
  selector: 'page-handover-notification-center',
  templateUrl: 'handover-notification-center.html',
})
export class HandoverNotificationCenterPage {

  users : Array<any> = null;
  sender : any = {};
  site;
  ticket : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private service : NotificationProvider,
              private alertCtrl : AlertController,
              private sanitizer : DomSanitizer) {
  }

  ionViewDidLoad()
  {
    this.ticket = this.navParams.get("ticket");
    this.site = PublicShared.CurrentSite.SiteID;
    this.getUsers(this.site);
  }

  getUsers(site)
  {
    this.service.getHandoverUsers(site)
      .subscribe((res)=>
      {
        this.sender.name = PublicShared.CurrentUserName;
        this.sender.token = PublicShared.CurrentUserToken;
        res.Data.forEach(sender =>
        {
          if(sender.PhotoExtention)
          {
            let dangerous = `http://80.241.220.137:5050/Uploads/Images/Users/${sender.ParkUserName}.${sender.PhotoExtention}`;
            sender.photo = this.sanitizer.bypassSecurityTrustUrl(dangerous);
          }
        });
        this.users = res.Data;
        console.log("the data");
        console.log(res.Data);
      })
  }

  sendPush(token , senderToken , senderEmail,  message : string , type : string): void
  {

    let model = {
      "senderToken": senderToken,
      "senderEmail" : senderEmail,
      "type": type,
      "message" : `${message}`,
      "barcode" : this.ticket.BarCode
    };

    this.alertCtrl.create({
      title : "Done",
      buttons : [
        {
          text : "Send",
          handler : (data)=>
          {
            this.service.sendHandoverNotification(token , model)
              .subscribe((res)=>
              {
                console.log("after send notification");
                console.log(res);
                this.alertCtrl.create({
                  title : "Done",
                  message : "Message sent !",
                  buttons : [
                    {
                      text : "Ok"
                    }
                  ]
                }).present();
              } , (err)=>
              {
                console.log("fire base error");
                console.log(err);
              })
          }
        },
        {
          role : "cancel",
          text : "Cancel"
        }
      ]
    }).present();

  }
}
