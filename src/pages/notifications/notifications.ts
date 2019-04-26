import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NotificationProvider} from "../../providers/notification/notification";
import { PublicShared } from '../../models/public-shared';
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage({
  name : "notifications"
})
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

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
    this.ticket = PublicShared.Ticket;
    this.site = PublicShared.CurrentSite.SiteID;
    this.getUsers(this.site);
  }

  getUsers(site)
  {
     this.service.getOnlineUsers(site)
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
    console.log("reciver token :   " + token);
    console.log(senderToken);
    console.log(senderEmail);
    console.log(message);
    console.log(type);

    if(this.ticket.BarCode === null)
      this.ticket.BarCode = "null";

    let model = {
      "senderToken": senderToken,
      "senderEmail" : senderEmail,
      "type": type,
      "message" : `${message}`,
      "barcode" : this.ticket.BarCode
    };

    this.alertCtrl.create({
      title : "Done",
      inputs : [
        {
          type : 'number',
          placeholder : "Enter The amount",
          name : "amount"
        }],
      buttons : [
        {
          text : "Send",
          handler : (data)=>
          {
            this.service.sendAmountNotification(token , model , data.amount)
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
