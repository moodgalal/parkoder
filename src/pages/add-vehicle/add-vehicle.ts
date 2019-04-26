import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CarsProvider} from "../../providers/cars/cars";

@IonicPage()
@Component({
  selector: 'page-add-vehicle',
  templateUrl: 'add-vehicle.html',
})
export class AddVehiclePage {
  vehicle: any = {};
  customer: any = {};
  carBrand: any[];
  carColor: any[];
  carType: any[];
  carStatus: any[];
  countries: any[];
  editStatus: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private carService: CarsProvider) {
    this.customer = this.navParams.get("customer");
    this.editStatus = this.navParams.get("edit");
    if (this.editStatus) {
      this.vehicle = this.navParams.get("vehicle");
    }
    this.vehicle.CUSTNMBR = this.customer.CUSTNMBR;
    this.vehicle.CustomerName = this.customer.CustomerName;
    this.vehicle.CustomerPhoneNumber = this.customer.CustomerPhoneNumber;
    this.getCarBrand();
    this.getCarColor();
    this.getCarType();
    this.getCountries();
    this.getCarStatus();
  }



  public getCarBrand() {
    this.carService.getBrands().subscribe(res => {
      console.log(`====================================`);
      console.log(res);
      this.carBrand = res.Data; //  {VehicleBrandID: 1, VehicleBrandName: "NONE"}
    })
  }

  public getCarColor() {
    this.carService.getColors().subscribe(res => {
      console.log(`========= Colors ========`);
      console.log(res);
      this.carColor = res.Data; // {VehicleColorID: 1, VehicleColorName: "NONE"}
    })
  }

  public getCarType() {
    this.carService.getTypes().subscribe(res => {
      console.log(`========= Type =========`);
      console.log(res);
      this.carType = res.Data;
    })
  }

  public getCountries() {
    this.carService.getAllCountries().subscribe(res => {
      console.log(`======== Countries =========`);
      console.log(res);
      this.countries = res.Data;
    })
  }

  public getCarStatus() {
    this.carService.getStatus().subscribe(res => {
      console.log(`========= Status =========`);
      console.log(res);
      this.carStatus = res.Data;
    })
  }

  public addNewVehicle() {
    this.carService.addVehicle(this.vehicle).subscribe(res => {
      console.log(`========= vehicle ========`);
      console.log(res);
      this.navCtrl.popToRoot();
    })
  }

  public editVehicle() {
    this.carService.editVehicle(this.vehicle).subscribe(res => {
      console.log(res);
      this.navCtrl.popToRoot();
    })
  }

}
