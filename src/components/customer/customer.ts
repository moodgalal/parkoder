import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CarsProvider} from '../../providers/cars/cars';
import {ToastController} from 'ionic-angular'

@Component({
  selector: 'customer',
  templateUrl: 'customer.html'
})
export class CustomerComponent {
  @Input() Ticket  :any = {};
  @Output() closeEvent = new EventEmitter();
  disabledInputs: boolean = false;
  constructor(private _service: CarsProvider, private toast: ToastController) {
    console.log('swwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
  }
  save() {
    this._service.saveCustomerInfo(this.Ticket.BarCode, this.Ticket.CustomerPhoneNumber, this.Ticket.CUSTNMBR, this.Ticket.CustomerName).subscribe(res => {
      console.log(res);
      if (res.StatusType > 0) {
        this.toast.create({ message: `${res.Message}`, position: "top", duration: 2000 }).present()
      }
    })
  }
  Search() {
    this._service.GetCustomerInfo(this.Ticket.CUSTNMBR).subscribe(res => {
      console.log(res);
      if (res.StatusType > 0) {
        this.toast.create({ message: `${res.Message}`, position: "top", duration: 2000 }).present();
        return;
      } else {
        this.disabledInputs = true;
        this.Ticket.CUSTNMBR = res.Data.CUSTNMBR;
        this.Ticket.CustomerName = res.Data.CustomerName;
        this.Ticket.CustomerPhoneNumber = res.Data.CustomerPhoneNumber;
        this.Ticket.Points = res.Data.Points;
      }

    })
  }

  close() {
    this.closeEvent.emit(true);
  }

  clear() {
    this.disabledInputs = false;
    this.Ticket.CUSTNMBR = '';
    this.Ticket.CustomerName = '';
    this.Ticket.CustomerPhoneNumber = '';
    this.Ticket.Points = 0;
  }
}
