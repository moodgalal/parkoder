import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PublicShared} from "../../models/public-shared";
import {CarsProvider} from "../../providers/cars/cars";
import {Storage} from "@ionic/storage";
import {Car} from "../../models/car";


@IonicPage({
  name : "readonly-details"
})
@Component({
  selector: 'page-readonly-details',
  templateUrl: 'readonly-details.html',
})
export class ReadonlyDetailsPage {

  Ticket: any = {};
  myCar = {} as Car;
  price : any;
  countryName: string;
  carDuration: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private carService: CarsProvider,
              private storage: Storage,
  ) {
  }

  ionViewDidEnter() {
    this.Ticket = this.navParams.get("Ticket");
    this.Ticket.TimeIn = new Date(this.Ticket.TrxDateFrom);
    this.Ticket.outTime = new Date();
    this.carDuration = this.Ticket.timeDuration;
    this.getCountryName();
    if (this.Ticket.IsPaid === 0) {
      this.carService.GetPrice(this.carDuration, PublicShared.CurrentSite.SiteID).subscribe((res) => {
        this.Ticket.DocAmount = res.Data;
        //this.allInfo.Points = 0
      }, () => {
        this.alertCtrl.create({ title: "Server error", message: "Please try again later", buttons: ["Ok"] }).present()
      })
    }
  }

  getCountryName() {
    this.storage.get('countries').then(data => {
      //console.log(data);
      if (data != null) {
        data.map((country) => {
          //console.log(country);
          if (country.CountryCode == this.Ticket.CountryCode) {
            this.countryName = country.CountryName;
          }
        })
      }
    });
  }
}
