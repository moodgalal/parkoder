import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CarsProvider } from "../../providers/cars/cars";
import { Storage } from "@ionic/storage";
import { DamagesDrawPage } from '../damages-draw/damages-draw';
import { PublicShared } from '../../models/public-shared';

@IonicPage({
  name: "status-zero-details"
})
@Component({
  selector: 'page-status-zero-details',
  templateUrl: 'status-zero-details.html',
})
export class StatusZeroDetailsPage {
  Ticket: any = {};
  showPayment: boolean = false;
  showCustomer: boolean = false;
  carDuration: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private carService: CarsProvider,
    // private storage : NativeStorage,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
  }
  ionViewDidEnter() {
    this.Ticket = this.navParams.get("Ticket");
    this.Ticket.TimeIn = new Date(this.Ticket.TrxDateFrom);
    this.carDuration = this.Ticket.timeDuration;
    this.getCountryName()
  }
  getCountryName() {
    this.storage.get('countries').then(data => {
      if (data != null) {
        data.map((country) => {
          if (country.CountryCode == this.Ticket.CountryCode) {
            this.Ticket.countryName = country.CountryName;
          }
        })
      }
    });
  }

  showPaymentComponent() {
    this.showPayment = !this.showPayment;
    this.showCustomer = false;
  }
  showcustomerComponent() {
    this.showCustomer = !this.showCustomer;
    this.showPayment = false;
  }
  DoHoldIn() {
    this.carService.DoHoldIn(this.Ticket.BarCode, PublicShared.CurrentUserName)
      .subscribe((res) => {
        if (res.StatusType > 0) {
          this.alertCtrl.create({ title: "Error !", message: res.Message }).present();
          return;
        }
      }, () => {
        this.alertCtrl.create({ title: "Server error", message: "Please try again later", buttons: ["Ok"] }).present()
      });
    this.navCtrl.popToRoot();
  }
  DoAttendIn() {
    this.carService.DoAttendIn(this.Ticket.BarCode, PublicShared.CurrentUserName)
      .subscribe((res) => {
        if (res.StatusType > 0) {
          this.alertCtrl.create({ title: "Error !", message: res.Message }).present();
          return;
        }
        this.Ticket.RecordStatusID = 1
        this.navCtrl.push("pins", { Ticket: this.Ticket });
      }, () => {
        this.alertCtrl.create({ title: "Server error", message: "Please try again later", buttons: ["Ok"] }).present()
      });
  }
  Cancel() {
    this.navCtrl.popToRoot();
  }
  GoTOBin() {
    this.navCtrl.push("pins", { Ticket: this.Ticket });
  }
  closePayment(event) {
    if (event) {
      this.showPayment = false;
    }
  }
  closeCustomer(event) {
    if (event) {
      this.showCustomer = false;
    }
  }
  drawDamages() {
    this.modalCtrl.create(DamagesDrawPage)
      .present()
  }

}
