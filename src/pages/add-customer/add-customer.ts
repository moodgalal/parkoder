import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarsProvider } from '../../providers/cars/cars';

@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
})
export class AddCustomerPage {
  newCustomer: any = {
    Points: null
  };
  vehicles: any[];
  showEditButton: boolean = false;
  cities: any[];
  nationalities: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private _service: CarsProvider) {
    if (this.navParams.get("edit")) {
      this.newCustomer = this.navParams.get("customer");
      this.showEditButton = true;
      this.getVehicleToUpdate();
    }
    this.getCitites();
    this.getNationalities();
  }

  ionViewDidLoad() { }

  getCitites() {
    this._service.getAllCities().subscribe((res) => {
      console.log(res);
      this.cities = res;
    })
  }

  getNationalities() {
    this._service.getAllNationalities().subscribe((res) => {
      console.log(res);
      this.nationalities = res;
    })
  }
  addNewCustomer() {
    console.log(this.newCustomer);
    this._service.addCustomer(this.newCustomer).subscribe((res) => {
      console.log(res);
      this.navCtrl.push("AddVehiclePage", {customer: this.newCustomer});
    })
  }
  editCustomer() {
    console.log(this.newCustomer);
    this._service.editCustomer(this.newCustomer).subscribe((res) => {
      console.log(res);
    })
  }

  editVehicle(vehicle) {
    this.navCtrl.push("AddVehiclePage", {
      edit: true,
      customer: this.newCustomer,
      vehicle: vehicle
    });
  }

  addVehicle() {
    this.navCtrl.push("AddVehiclePage", {
      edit: false,
      customer: this.newCustomer
    });
  }



  public getVehicleToUpdate() {
    this._service.getCustomerVehicle(this.newCustomer.CUSTNMBR).subscribe(res => {
      console.log(res);
      this.vehicles = res;
    })
  }
}
