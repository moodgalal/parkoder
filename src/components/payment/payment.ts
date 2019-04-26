import { Component, Input, Output, EventEmitter } from '@angular/core';
import {  ToastController } from 'ionic-angular';
import { CarsProvider } from '../../providers/cars/cars';
@Component({
  selector: 'payment',
  templateUrl: 'payment.html'
})
export class PaymentComponent {
  @Input() data;
  @Output() closeEvent = new EventEmitter();
  currencies: Array<any> = [];
  constructor(private _service: CarsProvider, private toast: ToastController) {
    this.getCurrencies();
  }
  ionViewDidLoad() {




  }
  save() {
    console.log(this.data);
    this._service.SaveAdvancedPaymentData(this.data.BarCode, this.data.AdvancedPayment).subscribe(res => {
      console.log(res);

      if (res.StatusType > 0) {
        this.toast.create({ message: `${res.Message}`, position: "top", duration: 2000 }).present()
      } else {
        this.close();
      }
    })
  }
  close() {
    this.closeEvent.emit(true);
  }
  getCurrencies() {
    this._service.getCurrencyTypes()
      .subscribe((res) => {
        if (res.StatusType > 0) {

        }
        else {
          this.currencies = res.Data;
          console.log(this.currencies);
        }

      }, () => {
        //this.toast.create({
        //  title: "Server error",
        //  message: "Please try again later",
        //  buttons: ["Ok"]
        //}).present()
      })
  }
}
