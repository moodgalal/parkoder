import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {CarsProvider} from "../../providers/cars/cars";
import {Storage} from "@ionic/storage";
import { DamagesDrawPage } from '../damages-draw/damages-draw';
import { PublicShared } from '../../models/public-shared';

@IonicPage({
  name : "status-one-details"
})
@Component({
  selector: 'page-status-one-details',
  templateUrl: 'status-one-details.html',
})
export class StatusOneDetailsPage {

  Ticket: any = {};
  showPayment: boolean = false;
  showCustomer: boolean = false;
  carDuration: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private carService : CarsProvider,
              private alertCtrl : AlertController,
              private storage : Storage,
              private modalCtrl : ModalController
            ) { }

  ionViewDidEnter() {
        this.Ticket = this.navParams.get("Ticket");
        this.Ticket.CurrencyCode = PublicShared.CurrentSite.CurrencyCode;
        this.Ticket.TimeIn = new Date(this.Ticket.TrxDateFrom);
        this.Ticket.DocAmount = 5;
        this.carDuration = this.Ticket.timeDuration;
    //this.carService.GetPrice(this.Ticket.BarCode).subscribe((res) => {
    //  if (res.StatusType > 0) {
    //    this.alertCtrl.create({ title: "Error !", message: res.Message }).present();
    //    return;
    //  }
    //  this.Ticket.DocAmount = res.Data;
    //  this.Ticket.Points = 0
    //}, () => {
    //  this.alertCtrl.create({ title: "Server error", message: "Please try again later", buttons: ["Ok"] }).present()
    //})
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

  saveHold() {
    this.carService.DoHoldIn(this.Ticket.BarCode,'')
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

  goToPin() {
    this.navCtrl.push("pins", { Ticket: this.Ticket });
  }

  Cancel() {
    this.navCtrl.popToRoot();
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

  drawDamages()
  {
    this.modalCtrl.create(DamagesDrawPage)
      .present()
  }

}
