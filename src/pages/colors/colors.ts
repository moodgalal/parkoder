import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {CarsProvider} from "../../providers/cars/cars";
// import {NativeStorage} from "@ionic-native/native-storage";
import {Storage} from "@ionic/storage";
import { PublicShared } from '../../models/public-shared';

@IonicPage({
  name: "colors"
})
@Component({
  selector: 'page-colors',
  templateUrl: 'colors.html'
})
export class ColorsPage {

  rightColors: Array<any> = [
    { id: 1, name: "White" },
    { id: 2, name: "Silver" },
    { id: 3, name: "Black" },
    { id: 4, name: "Grey" },
    { id: 5, name: "Red" },
  ];

  leftColors: Array<any> = [
    { id: 6, name: "Blue" },
    { id: 7, name: "Green" },
    { id: 8, name: "Yellow" },
    { id: 9, name: "Gold" },
    { id: 10, name: "Brown" }
  ];

  Ticket: any;
  selected: number = null;

  type: boolean;
  status: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private carService: CarsProvider,
    private alertCtrl: AlertController,
    // private storage : NativeStorage,
    private storage: Storage,
    private toast: ToastController,
    private publicShared : PublicShared
  ) {
  }

  ionViewDidEnter() {
    this.Ticket = this.navParams.get("Ticket");
    this.Ticket.TrxDateFrom = new Date(this.Ticket.TrxDateFrom);

    this.Ticket.CurrencyCode = PublicShared.CurrentSite.CurrencyCode;
    this.Ticket.BinUserName = PublicShared.CurrentUserName.toString().trim();
    this.selected = PublicShared.Ticket.VehicleColorID;
    this.type = PublicShared.CurrentSite.VehicleType;
    this.status = PublicShared.CurrentSite.VehicleStatus;
  }

  async goTypes(obj) {

    let id = obj.id;
    PublicShared.Ticket.VehicleColorID = obj.id;
    this.Ticket.VehicleColorID = id;
    let RecordStatusID = -1;
    if (this.type == false && this.status == false) {
      await  this.SaveColor(id, 5);
      if(this.publicShared.inProcessUser)
          this.goRetrieve();
      else
          this.goHome();

      return;
    }
    if (this.type == true) {
      this.SaveColor(id, RecordStatusID);
      this.navCtrl.push("types", { Ticket: this.Ticket });
    }
    else if (this.status == true) {
      this.SaveColor(id, RecordStatusID);
      this.navCtrl.push("status", { Ticket: this.Ticket });
    }

  }

  goRetrieve()
  {
    this.navCtrl.setRoot("retrieval-info", {Ticket : this.Ticket});
  }

  SaveColor(VehicleColorID, RecordStatusID) {
    this.carService.SaveColor(this.Ticket.BarCode, VehicleColorID, RecordStatusID).subscribe((res) => {
    }, () => {
      this.alertCtrl.create({ title: "Server Error", message: "Try again later Please", buttons: ["Ok"] }).present()
    });
  }
  goHome() {
    this.navCtrl.popToRoot();
    //this.carService.saveCarData(this.Ticket)
    //  .subscribe((res) => {
    //    if (res.StatusType > 0) {
    //      this.alertCtrl.create({
    //        title: "Error !",
    //        message: res.Message
    //      }).present();
    //      return;
    //    }

    //    console.log("after save car data");
    //    console.log(res);
    //    this.toast.create({
    //      message: "Car data have been saved",
    //      duration: 2000,
    //      position: "top"
    //    }).present().then(() => {
    //      this.navCtrl.popToRoot();
    //    });
    //  }, (err) => {
    //    this.alertCtrl.create({
    //      title: "Server Error",
    //      message: "Please try again later",
    //      buttons: ["Ok"]
    //    }).present()
    //      .then(() => {
    //        this.navCtrl.popToRoot();
    //      });
    //  });
  }

  addCustomer() {
    this.alertCtrl.create({
      title: "Customer Info",
      inputs: [
        {
          type: "text",
          placeholder: "Enter Customer Name",
          name: "cusName",
          value: this.Ticket.CustomerName == null ? "" : this.Ticket.CustomerName
        },
        {
          type: "text",
          placeholder: "Enter Customer Number",
          name: "cusNum",
          value: this.Ticket.CUSTNMBR == null ? "" : this.Ticket.CUSTNMBR
        },
        {
          type: "text",
          placeholder: "Enter Customer Phone Number",
          name: "cusPhone",
          value: this.Ticket.CustomerPhoneNumber == null ? "" : this.Ticket.CustomerPhoneNumber
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
            this.carService.saveCustomerInfo(this.Ticket.BarCode, data.cusPhone, data.cusNum, data.cusName)
              .subscribe((res) => {
                if (res.StatusType > 0) {
                  this.alertCtrl.create({
                    title: "Error !",
                    message: res.Message
                  }).present();
                  return;
                }

                this.Ticket.CustomerName = data.cusName;
                this.Ticket.CUSTNMBR = data.cusNum;
                this.Ticket.CustomerPhoneNumber = data.cusPhone;
                console.log(res)
              }, (error) => {
                console.log(error)
              })
          }
        },
        {
          text : "Search"
        }
      ]
    }).present()
  }
}
