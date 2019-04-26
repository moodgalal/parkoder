import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Navbar } from 'ionic-angular';
import { CarsProvider } from "../../providers/cars/cars";
// import * as firebase from 'firebase';
// import {NativeStorage} from "@ionic-native/native-storage";
import { Storage } from "@ionic/storage";
import { AlertInputOptions } from "ionic-angular/components/alert/alert-options";
import { PublicShared } from '../../models/public-shared';

@IonicPage({
  name: "pins"
})
@Component({
  selector: 'page-pin-locations',
  templateUrl: 'pin-locations.html',
})
export class PinLocationsPage {

  @ViewChild(Navbar) navBar: Navbar;
  Ticket: any = null;
  binsLocations: Array<any> = [];
  //info: any;
  // firebaseDB = firebase.database();
  selected: number = null;
  subsites: Array<any>;
  subSiteId: number = -1;
  brand: boolean;
  color: boolean;
  type: boolean;
  status: boolean;
  disableButtons: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carService: CarsProvider,
    // private storage : NativeStorage,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toast: ToastController,
  ) {
  }


  ionViewDidEnter() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.goBack();
    };

    this.Ticket = this.navParams.get("Ticket");
    let date = new Date(this.Ticket.TrxDateFrom);
    this.Ticket.TimeIn = date.getHours() + ":" + date.getMinutes();
    this.Ticket.BinUserName = PublicShared.CurrentUserName;
    this.subsites = PublicShared.ParkingList;

    this.storage.get("pinpage_id").then((res) => {
      this.subSiteId = res ? res : -1;
      if(this.subSiteId === -1)
        this.doFilter();
      else
        this.getBins(this.subSiteId);
    });

    this.brand = PublicShared.CurrentSite.VehicleBrand;
    this.color = PublicShared.CurrentSite.VehicleColor;
    this.type = PublicShared.CurrentSite.VehicleType;
    this.status = PublicShared.CurrentSite.VehicleStatus;

    this.selected = PublicShared.Ticket.binId;
  }

  getBins(subsite) {
    if (subsite > 0) {
      this.carService.getBins(subsite).subscribe((res) => {
        this.binsLocations = res.Data;
        console.log("server data");
        console.log(this.binsLocations);
      });
    }
  }
  processBin(Bin) {
    console.log(Bin);
    if (this.subSiteId == -1 || this.subSiteId == null) {
      this.alertCtrl.create({ title: "WARNING !", message: "Please select Parking !", buttons: ["Ok"] }).present();
      return;
    }
    PublicShared.Ticket.binId = Bin.BinID;
    this.carService.BinSave(this.Ticket.BarCode, PublicShared.CurrentUserName
      , this.subSiteId, Bin.BinID.toString(), Bin.BinName).subscribe((res) => {
        if (res.StatusType == 0) {
          if (this.brand == true) {
            this.navCtrl.push("brands", { Ticket: this.Ticket });
            return;
          }
          else if (this.color == true) {
            this.navCtrl.push("colors", { Ticket: this.Ticket });
            return;
          }
          else if (this.type == true) {
            this.navCtrl.push("types", { Ticket: this.Ticket });
            return;
          }
          else if (this.status == true) {
            this.navCtrl.push("status", { Ticket: this.Ticket });
            return;
          }
        }
        else {
          this.handleError();
          this.disableButtons = false;
        }
      }, (err) => {
            this.handleError();
            this.disableButtons = false;
      });
  }

  goHome() {
    if (this.Ticket.RecordStatusID == 1) {
      this.carService.binRequestCancel(this.Ticket.EntryUserName, this.Ticket.BarCode)
        .subscribe((res) => {
          if (res.StatusType == 0) {
            //let myRef = this.firebaseDB.ref().child(this.Ticket.SiteId.toString());
            //myRef.set({ barcode: this.Ticket.BarCode });
            this.navCtrl.popToRoot();
          }
          else {
            this.handleError()
          }
        }, () => {
          this.handleError()
         });
    } else {
      //let myRef = this.firebaseDB.ref().child(this.Ticket.SiteId.toString());
      //myRef.set({ barcode: this.Ticket.BarCode });
      this.navCtrl.popToRoot();
    }
  }

  goBack() {
    this.navCtrl.pop();//by wael
    //this.carService.binRequestCancel(this.Ticket.EntryUserName, this.Ticket.BarCode)
    //  .subscribe((res) => {
    //    if (res.StatusType == 0) {
    //      let myRef = this.firebaseDB.ref().child(this.Ticket.SiteId.toString());
    //      myRef.set({ barcode: this.Ticket.BarCode });
    //      this.navCtrl.pop()
    //    }
    //    else {
    //      this.alertCtrl.create({
    //        title: "Server Error",
    //        message: "Try again later Please",
    //        buttons: ["Ok"]
    //      }).present()
    //    }
    //  }, () => {
    //    this.alertCtrl.create({
    //      title: "Server Error",
    //      message: "Try again later Please",
    //      buttons: ["Ok"]
    //    }).present()
    //  });
  }

  doFilter() {
    console.log(this.subSiteId);
    console.log(this.subsites);
    if (this.subsites) {
      let alertOptions: Array<AlertInputOptions> = [];
      let schema: any = {};
      let x = 0;

      for (x; x < this.subsites.length; x++) {
        schema = {
          type: "radio",
          label: this.subsites[x].SubSiteName,
          value: this.subsites[x].SubSiteID,
          checked: this.subsites[x].SubSiteID == this.subSiteId
        };

        alertOptions.push(schema)
      }
      this.alertCtrl.create({
        title: "Select Parking",
        inputs: alertOptions,
        buttons: [
          {
            text: "Close",
          },
          {
            text: "Select",
            handler: (value) => {
              this.storage.set("pinpage_id", value).then(() => {

                console.log('setted');
              });
              this.subSiteId = value;
              this.getBins(value);
            }
          }
        ]
      }).present()

    }
  }

  handleError()
  {
    this.alertCtrl.create({ title: "Server Error", message: "Try again later Please", buttons: ["Ok"] }).present()
  }
}
