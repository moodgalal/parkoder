import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar } from 'ionic-angular';
import { Car, site } from "../../models/car";
import { CarsProvider } from "../../providers/cars/cars";
import { PublicShared } from '../../models/public-shared';

@IonicPage({
  name: "retrieve-request"
})
@Component({
  selector: 'page-retrieve-request',
  templateUrl: 'retrieve-request.html',
})
export class RetrieveRequestPage {

  @ViewChild(Navbar) navBar: Navbar;

  mySite = {} as site;
  myCar = {} as Car;
  allInfo: any;
  transSeconds: number;
  timeInMs = Date.now();
  price: any;
  username: string = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private carProvider: CarsProvider
  ) {
  }

  ionViewDidEnter() {
    this.allInfo = this.navParams.get("Ticket");
    //console.log(this.allInfo);
    //console.log("waelwaelwaelwaelwaelwaelwaelwaelwaelwael");
    this.navBar.backButtonClick = (e: UIEvent) => {
      //this.Cancel();
      this.navCtrl.popToRoot();
    };

    this.myCar.transDate = new Date(this.allInfo.TrxDateFrom);
    this.transSeconds = Math.floor(Date.parse(this.allInfo.TrxDateFrom));
    this.myCar.duration = Math.floor(this.allInfo.timeDuration);

    console.log(this.allInfo);

    this.username = PublicShared.CurrentUserName;
    this.getCurrency();
  }
  release() {
    this.carProvider.releaseCar(this.allInfo.BarCode, this.username)
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
  handover() {
    console.log(this.allInfo);

    this.navCtrl.push("handover-notification-center", {ticket : this.allInfo})

  }
  hold() {
    this.navCtrl.popToRoot();
  }
  payment() {
    this.navCtrl.push("payment" , {Ticket : this.allInfo})
  }
  Resume() {
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
  underConstruction() {
    this.alertCtrl.create({
      title: "Under construction",
      message: "Function is not available now",
      buttons: ["Ok"]
    }).present()
  }
  GoQueueOut() {
    this.carProvider.retrieveRequest(PublicShared.CurrentUserName,this.allInfo.BarCode)
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
  getCurrency() {
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

  addCustomer() {
    this.alertCtrl.create({
      title: "Customer Info",
      inputs: [
        {
          type: "text",
          placeholder: "Enter Customer Name",
          name: "cusName",
          value: this.allInfo.CustomerName == null ? "" : this.allInfo.CustomerName
        },
        {
          type: "text",
          placeholder: "Enter Customer Number",
          name: "cusNum",
          value: this.allInfo.CUSTNMBR == null ? "" : this.allInfo.CUSTNMBR
        },
        {
          type: "text",
          placeholder: "Enter Customer Phone Number",
          name: "cusPhone",
          value: this.allInfo.CustomerPhoneNumber == null ? "" : this.allInfo.CustomerPhoneNumber
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Save Customer",
          handler: (data) => {
            this.carProvider.saveCustomerInfo(this.allInfo.BarCode, data.cusPhone, data.cusNum, data.cusName)
              .subscribe((res) => {
                if (res.StatusType > 0) {
                  this.alertCtrl.create({
                    title: "Error !",
                    message: res.Message
                  }).present();
                  return;
                }
                this.allInfo.CustomerName = data.cusName;
                this.allInfo.CUSTNMBR = data.cusNum;
                this.allInfo.CustomerPhoneNumber = data.cusPhone;
                console.log(res)
              }, (error) => {
                console.log(error)
              })
          }
        }
      ]
    }).present()
  }
}
