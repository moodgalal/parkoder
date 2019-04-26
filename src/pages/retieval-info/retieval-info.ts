import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PublicShared } from '../../models/public-shared';
import { CarsProvider } from '../../providers/cars/cars';
import { Car, site } from '../../models/car';


@IonicPage({
  name : "retrieval-info"
})
@Component({
  selector: 'page-retieval-info',
  templateUrl: 'retieval-info.html',
})
export class RetievalInfoPage {

  mySite = {} as site;
  myCar = {} as Car;
  allInfo : any;
  transSeconds : number;
  timeInMs = Date.now();
  price : any;
  username : string = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams ,
              private alertCtrl : AlertController,
              private carProvider : CarsProvider
  ) {
  }

  ionViewDidEnter() {
    this.allInfo = this.navParams.get("Ticket");
    console.log(this.allInfo);

    this.myCar.transDate = new Date(this.allInfo.TrxDateFrom);
    this.transSeconds = Math.floor(Date.parse(this.allInfo.TrxDateFrom));
    this.myCar.duration = Math.floor(this.allInfo.timeDuration);

    console.log(this.allInfo);

    this.username = PublicShared.CurrentUserName;
    this.getCurrency();
  }
  release()
  {
     this.carProvider.releaseCar(this.allInfo.BarCode , this.username)
         .subscribe((res)=>
         {
           if (res.StatusType > 0)
           {
             this.alertCtrl.create({
               title : "Error !",
               message : res.Message
             }).present();
             return;
           }
           else
           {
             this.navCtrl.popToRoot()
           }
         })
  }
  handover()
  {
    console.log("all info");
    console.log(this.allInfo);
    this.navCtrl.push("handover-notification-center", {ticket : this.allInfo})
  }
  hold()
  {
    this.navCtrl.popToRoot()
  }
  payment()
  {
    this.navCtrl.push("payment")
  }
  Cancel() {
    this.carProvider.RetrieveCancel(this.allInfo.BarCode)
      .subscribe((res) => {
        if (res.StatusType > 0) {
          this.alertCtrl.create({
            title: "Error !",
            message: res.Message
          }).present();
          return;
        }
        else {
          this.navCtrl.popToRoot()
        }
      })
  }
  underConstruction()
  {
    this.alertCtrl.create({
      title : "Under construction",
      message : "Function is not available now",
      buttons : ["Ok"]
    }).present()
  }

  getCurrency()
  {
    if (this.allInfo.IsPaid === 1) return;
    //this.carProvider.GetPrice(this.allInfo.BarCode)
    //  .subscribe((res) => {
    //    if (res.StatusType > 0) {
    //      this.alertCtrl.create({
    //        title: "Error !",
    //        message: res.Message
    //      }).present();
    //      return;
    //    }
    //    console.log("price");
    //    console.log(res);

    //    this.price = res.Data;
    //  }, () => {
    //    this.alertCtrl.create({
    //      title: "Server error",
    //      message: "Please try again later",
    //      buttons: ["Ok"]
    //    }).present()
    //  })

  }

}
