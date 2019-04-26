import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CarsProvider } from '../../providers/cars/cars';
import { Countries } from './countries';

@IonicPage({
  name: "select-country"
}
)
@Component({
  selector: 'page-selectcountry',
  templateUrl: 'selectcountry.html',
})
export class SelectcountryPage {

  countries: Array<any>;
  countriesBackup: Array<any>;

  Ticket : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public carService: CarsProvider,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.Ticket = this.navParams.get("Ticket");
    this.getAllCountries();
  }

  getAllCountries() {
    this.countries = Countries.coutryList;
    this.countriesBackup = this.countries;
  }

  saveCar(country) {
    this.Ticket.CountryCode = country.CountryCode;
    this.Ticket.showPrefix = country.ShowText01;
    this.Ticket.maxPlateNum = country.maxPlateNum;
    this.Ticket.maxPrefixNum = country.maxPrefixNum;
    this.navCtrl.push("new-trans", { Ticket: this.Ticket});
  }

  initialize() {
    this.countries = this.countriesBackup;
  }

  getItem(event) {
    this.initialize();
    let searchValue = event.target.value;

    if (searchValue || searchValue.trim() != "") {
      this.countries = this.countries.filter((item) => {
        return (item.CountryName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      })
    }
  }

  goBack() {
    this.viewCtrl.dismiss();
  }
}
