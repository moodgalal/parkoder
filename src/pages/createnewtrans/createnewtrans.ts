import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { CarsProvider } from '../../providers/cars/cars';
import { Storage } from "@ionic/storage";
//import * as firebase from 'firebase';
import { PublicShared } from '../../models/public-shared';
import { Currency } from '../../models/currency';

@IonicPage({
  name: "new-trans"
})
@Component({
  selector: 'page-createnewtrans',
  templateUrl: 'createnewtrans.html',
})
export class CreatenewtransPage {

  Ticket: any = {};
  //firebaseDb = firebase.database();
  //subsiteId: number = null;
  disableButtons: boolean = false;

  hideUser: boolean = true;
  hidePayment: boolean = true;

  currencies: Array<any> = [];
  paidAmount: number = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carService: CarsProvider,
    // private storage : NativeStorage,
    private storage: Storage,
    private toast: ToastController,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidEnter() {
    PublicShared.Ticket.binId = null;
    PublicShared.Ticket.VehicleBrandID = null;
    PublicShared.Ticket.VehicleColorID = null;
    PublicShared.Ticket.typeId = null;
    PublicShared.Ticket.statusId = null;

    this.Ticket = this.navParams.get("Ticket");
    PublicShared.Ticket = {};
    this.Ticket.CurrencyCode = PublicShared.CurrentSite.CurrencyCode;
    this.Ticket.EntryUserName = PublicShared.CurrentUserName;
    this.Ticket.SiteID = PublicShared.CurrentSite.SiteID;
    this.Ticket.GateID = PublicShared.CurrentGate.GateID;
    this.Ticket.PlateNumber = '';
    this.Ticket.AdvancedPayment = 0;
    this.Ticket.CUSTNMBR = '';
    this.Ticket.CustomerName = '';
    this.Ticket.CustomerPhoneNumber = '';
    this.Ticket.PlateNoPrefix = '';
    let newDate = new Date();
    this.Ticket.TrxDateFrom = `${newDate}`;
    this.Ticket.timeDuration = "00:00:00";
    this.getCurrencies();
  }

  SaveData() {
    this.disableButtons = true;
    this.carService.SaveNewVehicle(this.Ticket).subscribe((resl) => {
      if (resl.StatusType > 0) {
        this.alertCtrl.create({ title: "Error !", message: resl.Message }).present();
        this.disableButtons = false;
        return;
      }
      this.RefreshFireBase();
      this.disableButtons = false;
    }, ((e) => {
      this.toast.create({ message: "Not available", duration: 2000 }).present().then(() => { this.disableButtons = false; })
    })
    )
  }
  GoQueueIn() {
    this.Ticket.RecordStatusID = 0;
    PublicShared.Ticket = this.Ticket;
    this.SaveData();
    this.navCtrl.popToRoot();
    //this.navCtrl.popTo("trans", { "activeUserInProcessCar": this.Ticket });
  }
  DoHold() {
    this.Ticket.RecordStatusID = 6;
    this.Ticket.InPorcessUser = PublicShared.CurrentUserName;
    PublicShared.Ticket = this.Ticket;
    this.SaveData();
    this.navCtrl.popToRoot();
    //this.navCtrl.popTo("trans", { "activeUserInProcessCar": this.Ticket });
  }
  AttendCar() {
    this.Ticket.RecordStatusID = 1;
    this.Ticket.InPorcessUser = this.Ticket.EntryUserName;
    this.carService.SaveNewVehicle(this.Ticket).subscribe((resl) => {
      if (resl.StatusType > 0) {
        this.alertCtrl.create({ title: "Error !", message: resl.Message }).present();
        return;
      }
      this.RefreshFireBase();
      PublicShared.Ticket = this.Ticket;
      this.navCtrl.push("pins", { Ticket: this.Ticket })
    }, ((e) => {
      this.toast.create({ message: "Not available", duration: 2000 }).present().then(() => { this.disableButtons = false; })
    })
    )
  }
  cancel() {
    this.navCtrl.popToRoot();
  }
  RefreshFireBase() {
     //wael
      //let myRef = this.firebaseDb.ref().child(this.Ticket.SiteID.toString());
      //console.log("database ref");
      //console.log(myRef);
      //myRef.set({ barcode: this.Ticket.BarCode });
  }


  showUser() {
    this.hideUser = !this.hideUser;
  }

  showPayment() {
    this.hidePayment = !this.hidePayment;
  }
  getCurrencies() {
    this.currencies = Currency.currencies;
  }

  CalcelPayment() {
    this.Ticket.CollectedAMT = 0;
    this.Ticket.CurrencyCode = PublicShared.CurrentSite.CurrencyCode;
    this.hidePayment = !this.hidePayment;
  }
  SavePayment() {
    if (this.Ticket.CollectedAMT <= 0)
    {
      this.alertCtrl.create({ title: "Error !", message: "Payment is Missing" }).present();
    }
    this.hidePayment = !this.hidePayment;
  }

  checkPlateNum(val : string)
  {
    console.log(val);
    if(val || val.trim() !== "")
    {
       this.Ticket.PlateNumber =  val.length > this.Ticket.maxPlateNum ?  val.slice(0 , this.Ticket.maxPlateNum) : val
    }
  }

  checkPrefixNum(val : string)
  {
    console.log(val);
    if(val || val.trim() !== "")
    {
      this.Ticket.PlateNoPrefix =  val.length > this.Ticket.maxPrefixNum ?  val.slice(0 , this.Ticket.maxPrefixNum) : val
    }
  }
}
