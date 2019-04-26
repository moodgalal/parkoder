import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, MenuController, ModalController, Platform } from 'ionic-angular';
import { CarsProvider } from '../../providers/cars/cars';
//import { Storage } from "@ionic/storage";
import { AlertInputOptions } from "ionic-angular/components/alert/alert-options";
//import * as firebase from 'firebase';
import { PublicShared } from '../../models/public-shared';

@IonicPage({ name: "trans" })
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  userEmail: string;
  Ticket: any = {};
  trans: Array<any> = [];
  transBackup: Array<any>;
  processedTrans: Array<any> = [];
  completedTrans: Array<any> = [];
  barcodeVal: string;
  binId;
  //firebaseDb = firebase.database();
  disableButtons: boolean = false;
  filterText: string;
  gateText: string;
  activeUserInProcessCar: any = null;
  IsFreeProcess: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private carService: CarsProvider,
    public alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    public platform: Platform,
    private publicShared : PublicShared
  ) {
    this.userEmail = PublicShared.CurrentUserName;
  }
  initialize() {
    //this.trans = this.transBackup;
  }
  @ViewChild("barcodeValid") barcodeInput;
  doRefresh(refresher) {
    this.getTrans();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  openMenu() {
    this.menuCtrl.toggle();
  }
  ionViewDidEnter() {
    this.activeUserInProcessCar = this.navParams.get("activeUserInProcessCar");
    //this.firebaseDb.ref().child(this.siteId.toString()).on('value', (snap) => {
    //  console.log("snap in trans");
    //  console.log(snap);
    //});
    this.getTrans();
    setTimeout(() => {
      this.barcodeInput.setFocus();
    }, 150);
  }


  getTrans() {

    if (PublicShared.CurrentSite.SiteID <= 0) {
      this.navCtrl.setRoot("branshes");
      return;
    }
    this.disableButtons = true;
    this.carService.GetAllVehicleTrasaction(PublicShared.CurrentSite.SiteID,
      PublicShared.CurrentBarking.SubSiteID,
      PublicShared.CurrentGate.GateID, PublicShared.CurrentUserName).subscribe((res) => {
        if (res.StatusType > 0) {
          this.alertCtrl.create({ title: "Server Error !", message: res.Message }).present();
          return;
        }
        this.disableButtons = false;
        this.trans = res.Data;
        PublicShared.transactions = res.Data;
        this.processedTrans = [];
        this.completedTrans = [];
        this.activeUserInProcessCar = null;
        this.IsFreeProcess = true;
        let SearchTicket = this.trans.filter((s) => s.RecordStatusID == 1 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim());
        if (SearchTicket != null && SearchTicket.length > 0) {

          this.pressStatus(SearchTicket[0]);
          return;
        } else {
          let tempInOut = this.trans.filter((s) => (s.RecordStatusID == 6 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim())
            || (s.RecordStatusID == 4 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim()));
          if (tempInOut.length > 0) {
            this.IsFreeProcess = false;
          }
        }
        this.publicShared.inProcessUser = false;

        let tempInOut = this.trans.filter((s) =>
          (s.RecordStatusID == 6 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim())
          || (s.RecordStatusID == 4 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim()));
        if (tempInOut.length > 1) {
          this.publicShared.inProcessUser = true;
        }
        //console.log(tempInOut.length);
        this.trans.forEach((item) => {
          item.IsPaid = 0;
          item.Points = 0;
          item.timeDuration = "00:00:00";
          if (item.DocAmount > 0 && item.DocAmount <= item.TotalCash) {
            item.IsPaid = 1;
          }
          if (item.RecordStatusID == 2) {
            this.processedTrans.push(item);
          }
          if (item.RecordStatusID == 5) {
            this.completedTrans.push(item);
          }
          if (item.RecordStatusID == 6 && this.userEmail.trim() == (item.InPorcessUser ? item.InPorcessUser.trim() : item.InPorcessUser))
            this.activeUserInProcessCar = item
        });
        this.transBackup = this.trans;
      },
      (error) => {
        this.disableButtons = false;
        this.toast.create({ message: `No response`, duration: 3000, position: "top" })
      })
  }

  ShowBarking() {
    this.barcodeVal = '';
    let alertOptions: Array<AlertInputOptions> = [];
    let schema: any = {};
    let x = 0;
    for (x; x < PublicShared.ParkingList.length; x++) {
      schema = {
        type: "radio",
        label: PublicShared.ParkingList[x].SubSiteName,
        value: PublicShared.ParkingList[x].SubSiteID,
        checked: PublicShared.ParkingList[x].SubSiteID == PublicShared.CurrentBarking.SubSiteID
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
            this.SelectBarking(value);
          }
        }
      ]
    }).present()
  }
  ShowGates() {
    this.barcodeVal = '';
    let alertOptions: Array<AlertInputOptions> = [];
    let schema: any = {};
    let x = 0;
    for (x; x < PublicShared.GateList.length; x++) {
      schema = {
        type: "radio",
        label: PublicShared.GateList[x].GateName,
        value: PublicShared.GateList[x].GateID,
        checked: PublicShared.GateList[x].GateID == PublicShared.CurrentGate.GateID
      };
      alertOptions.push(schema)
    }
    this.alertCtrl.create({
      title: "Select Gate",
      inputs: alertOptions,
      buttons: [
        {
          text: "Close",
        },
        {
          text: "Select",
          handler: (value) => {
            this.SelectGate(value);
          }
        }
      ]
    }).present()
  }
  SelectBarking(SubSiteID: number) {
    PublicShared.CurrentBarking.SubSiteID = SubSiteID;
    PublicShared.ParkingList.forEach((subsite) => {
      if (subsite.SubSiteID == SubSiteID) {
        PublicShared.CurrentBarking.SubSiteName = subsite.SubSiteName;
        this.filterText = subsite.SubSiteName;
      }
    });
    this.getTrans();
  }
  SelectGate(GateID: number) {
    PublicShared.CurrentGate.GateID = GateID;
    PublicShared.GateList.forEach((gate) => {
      if (gate.GateID == GateID) {
        this.gateText = gate.GateName;
        PublicShared.CurrentGate.GateName = gate.GateName;
      }
    });
    this.getTrans();
  }



  viewDetails(v) {
    this.Ticket = v;
    console.log(this.Ticket.RecordStatusID);
    switch (this.Ticket.RecordStatusID) {
      case 0:
        this.navCtrl.push("status-zero-details", { Ticket: this.Ticket });
        break;
      case 1:
        if (this.userEmail.trim() == (v.InPorcessUser ? v.InPorcessUser.trim() : v.InPorcessUser))
            this.navCtrl.push("status-one-details", { Ticket: this.Ticket });
        else
          this.navCtrl.push("readonly-details", { Ticket: this.Ticket });
        break;
      case 4:
        if (this.userEmail.trim() == (v.InPorcessUser ? v.InPorcessUser.trim() : v.InPorcessUser))
             this.navCtrl.push("retrieve-request", { Ticket: this.Ticket });
        else
          this.navCtrl.push("readonly-details", { Ticket: this.Ticket });
        break;
      case 6:
        if (this.userEmail.trim() == (v.InPorcessUser ? v.InPorcessUser.trim() : v.InPorcessUser))
              this.navCtrl.push("status-zero-details", { Ticket: this.Ticket });
        else
          this.navCtrl.push("readonly-details", { Ticket: this.Ticket });
        break;
      default:
        this.navCtrl.push("trans-detail", { Ticket: this.Ticket });
        break;
    }
  }

  getBarcode() {
    if (PublicShared.CurrentGate.GateID <= 0) {
      this.alertCtrl.create({ title: "Error !", message: "Selecting gate is required" }).present();
      return;
    }
    //this.disableButtons = true;
    let SearchTicket = this.trans.filter((s) => s.BarCode == this.barcodeVal);
    if (SearchTicket != null && SearchTicket.length > 0) {
      if (SearchTicket[0]["RecordStatusID"] == 6 && SearchTicket[0]["InPorcessUser"] != null
        && SearchTicket[0]["InPorcessUser"].trim() == this.userEmail.trim()) {
        this.pressStatus(SearchTicket[0]);
        return;
      }
      if (SearchTicket[0]["RecordStatusID"] == 4 && SearchTicket[0]["InPorcessUser"] != null
        && SearchTicket[0]["InPorcessUser"].trim() == this.userEmail.trim()) {
        this.pressStatus(SearchTicket[0]);
        return;
      }
    }
    let tempInOut = this.trans.filter((s) => (s.RecordStatusID == 6 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim())
      || (s.RecordStatusID == 4 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim()));
    if (tempInOut.length > 1) {
      this.alertCtrl.create({ title: "Error !", message: "you have a Car already in serive" }).present();
      this.barcodeVal = '';
      return;
    }

    this.carService.CheckTransaction(this.barcodeVal, PublicShared.CurrentSite.SiteID
      , PublicShared.CurrentGate.GateID).subscribe((res) => {
        if (res.StatusType > 0) {
          this.alertCtrl.create({ title: "Error !", message: res.Message }).present();
          return;
        }
      console.log("after transaction");
      console.log(res);
        if (res.Data.BarCode == null) {
          let tempinOnly = this.trans.filter((s) => s.RecordStatusID == 6 && s.InPorcessUser != null && s.InPorcessUser == this.userEmail);
          if (tempinOnly.length > 0) {
            this.barcodeVal = '';
            this.alertCtrl.create({ title: "Error !", message: "Car already in serive In" }).present();
            return;
          }
          let temp = this.trans.filter((s) => s.RecordStatusID == 1 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim());
          if (temp.length > 0) {
            this.alertCtrl.create({ title: "Error !", message: "you have a Car already in serive" }).present();
            this.disableButtons = false;
            return;
          }
          this.Ticket.BarCode = this.barcodeVal;
          this.Ticket.ItemID = res.Data.ItemID;
          this.Ticket.ItemName = res.Data.ItemName;
          this.Ticket.CUSTNMBR = '';
          this.Ticket.CustomerName = '';
          this.Ticket.CustomerPhoneNumber = '';
          this.Ticket.Points = 0;
          this.Ticket.RecordStatusID = 0;
          this.barcodeVal = '';
          this.navCtrl.push("select-country", { Ticket: this.Ticket });
        } else {

          let tempOut = this.trans.filter((s) => s.RecordStatusID == 3 && s.InPorcessUser != null && s.InPorcessUser.trim() == this.userEmail.trim());
          if (tempOut.length > 0) {
            this.alertCtrl.create({ title: "Error !", message: "you have a Car already in serive" }).present();
            this.disableButtons = false;
            return;
          }
          let temp = this.trans.filter((s) => s.RecordStatusID == 4 && s.InPorcessUser == this.userEmail);
          if (temp.length > 0) {
            this.alertCtrl.create({ title: "Error !", message: "Car already in serive Out" }).present();
            return;
          }
          this.Ticket = res.Data;
          this.viewDetails(this.Ticket);
        }

      });
  }
  getTime(event, car: any) {
    let date = car.TrxDateFrom;
    let myDate = new Date(date).getTime() / 1000;

    if (car.TrxDateTo !== null) {
      let dateTo = car.TrxDateTo;
      let myDateTo = new Date(dateTo).getTime() / 1000;

      car.timeDuration = myDateTo - myDate;
    }
    else
      car.timeDuration = event - myDate;
  }
  pressStatus(v) {
    //console.log(v);
    //console.log(v.RecordStatusID);
    this.disableButtons = true;
    switch (v.RecordStatusID) {
      case 0:
        //for (let x = 0; x < this.trans.length; x++) {
        //  if (this.trans[x].RecordStatusID == 1 && this.trans[x].UserNameIn == userEmail) {
        //    this.toast.create({
        //      message: "Car number: " + this.trans[x].PlateNumber + " under your responsibility",
        //      duration: 3000
        //    }).present()
        //      .then(() => {
        //        this.disableButtons = false;
        //      });
        //    return;
        //  }
        //}
        this.navCtrl.push("pins", { Ticket: v });
        //this.carService.binRequest(userEmail, v.BarCode)
        //  .subscribe((result) => {
        //    if (result.StatusType == 0) {

        //      let myRef = this.firebaseDb.ref().child(this.siteId.toString());
        //      myRef.set({ barcode: v.BarCode });
        //      this.navCtrl.push("pins", { Ticket: v  });
        //    }
        //    else {
        //      this.alertCtrl.create({title: "Warning !",message: "You can't do this process",buttons: ["Ok"]}).present();
        //    }
        //  });
        this.disableButtons = false;
        break;
      case 1:
          this.navCtrl.push("pins", { Ticket: v });
        this.disableButtons = false;
        break;
      case 3:
          this.navCtrl.push("retrieve-request", { Ticket: this.Ticket });
        this.disableButtons = false;
        break;
      case 4:
        if (this.userEmail != null)
          this.navCtrl.push("inProcessTrans", { Ticket: v, userEmail: this.userEmail });
        this.disableButtons = false;
        break;
      case 5:
        this.navCtrl.push("trans-detail", { Ticket: v });
        this.disableButtons = false;
        break;
      case 6:
        if (this.userEmail.trim() == (v.InPorcessUser ? v.InPorcessUser.trim() : v.InPorcessUser)) {
          this.navCtrl.push("pins", { Ticket: v });
        }
        else {
          this.alertCtrl.create({ title: "Warning !", message: "In another Process", buttons: ["Ok"] }).present();
        }
        this.disableButtons = false;
        break;
      default:
        console.log("done");
        this.disableButtons = false;
        break;
    }
  }

  showProcessed() {
    this.navCtrl.push("processed", { cars: this.processedTrans, siteId: PublicShared.CurrentSite.SiteID, subsiteId: PublicShared.CurrentBarking.SubSiteID })
  }
  openCompleted() {
    console.log('openCompleted');
    this.navCtrl.push("completed", { cars: this.completedTrans, siteId: PublicShared.CurrentSite.SiteID, subsiteId: PublicShared.CurrentBarking.SubSiteID })
  }

  // change 3 to 6
  // default currency code and doesn't change
}
