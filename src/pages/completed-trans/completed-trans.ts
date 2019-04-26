import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name:"completed"
})
@Component({
  selector: 'page-completed-trans',
  templateUrl: 'completed-trans.html',
})
export class CompletedTransPage {

  completed : Array<any>;
  siteId;
  subsiteId;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.completed =  this.navParams.get("cars");
    this.siteId = this.navParams.get("siteId");
    this.subsiteId = this.navParams.get("subsiteId");
  }

  viewDetails(v)
  {
    console.log(v.IsPaid);
    console.log(v);
    this.navCtrl.push("trans-detail", { Ticket : v});
  }

  getTime(event , car : any)
  {
    let  date = car.TrxDateFrom;
    let myDate = new Date(date).getTime()/1000;
    car.timeDuration = event -  myDate;
  }

}
