import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarsProvider } from '../../providers/cars/cars'

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  customers: any[];
  filteredItems: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private _service: CarsProvider) { }

  ionViewWillEnter() {

    this._service.getAllCustomers().subscribe(res => {
      console.log(`=====================================`);
      console.log(res);
      this.customers = res;
      this.initializeCustomers();
    });

  }


  initializeCustomers() {
    this.filteredItems = this.customers;
  }



  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeCustomers();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.filteredItems = this.filteredItems.filter((item) => {
        return (item.CustomerName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  addCustomer() {
    this.navCtrl.push("AddCustomerPage");
  }

  goToEdit(customer) {
    this.navCtrl.push("AddCustomerPage", {edit: true, customer: customer});
  }



}
