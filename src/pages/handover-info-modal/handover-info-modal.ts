import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {PublicShared} from "../../models/public-shared";
import {NotificationProvider} from "../../providers/notification/notification";


@IonicPage({
  name:"handover-info"
})
@Component({
  selector: 'page-handover-info-modal',
  templateUrl: 'handover-info-modal.html',
})
export class HandoverInfoModalPage {

  barcode;
  token;
  allInfo : any;
  myCar;
  userEmail : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl : ViewController,
              public alertCtrl: AlertController,
              private service : NotificationProvider
  ) {
  }

  ionViewDidEnter() {
    this.barcode = this.navParams.get("barcode");
    this.token = this.navParams.get("token");
    this.userEmail = PublicShared.CurrentUserName;
    if(PublicShared.transactions)
    {
      PublicShared.transactions.forEach(trans=>
      {
        if(trans.BarCode.trim() === this.barcode.trim())
        {
          this.allInfo = trans
        }
      });

      if (this.allInfo)
        this.myCar = new Date(this.allInfo.TrxDateFrom);
    }
    else
    {
      this.service.getCarData(this.barcode)
        .subscribe((res)=>
        {
          this.allInfo = res.Data;
          if (this.allInfo)
            this.myCar = new Date(this.allInfo.TrxDateFrom);
        });
    }
  }

  acceptCar()
  {
    this.sendPush(this.token ,PublicShared.CurrentUserToken , PublicShared.CurrentUserName ,  "I'll Take it" , "reciever");
    this.service.getHandoverCar(PublicShared.CurrentUserName, this.barcode)
      .subscribe((res)=>
      {
        console.log("this is mine now");
        this.navCtrl.push("trans-detail", {Ticket : this.allInfo})
      })
  }

  declineCar()
  {
    this.sendPush(this.token ,PublicShared.CurrentUserToken , PublicShared.CurrentUserName ,  "I can't take it now" , "reciever");
    this.dismissModal();
  }
  dismissModal()
  {
    this.viewCtrl.dismiss()
  }

  sendPush(token , senderToken , senderEmail,  message : string , type : string ): void
  {
    let model = {
      "senderToken": senderToken,
      "senderEmail" : senderEmail,
      "type": type,
      "message" : `${message}`
    };

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
}
