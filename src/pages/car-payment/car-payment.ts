import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,  AlertController} from 'ionic-angular';
import {Car, site} from "../../models/car";
import {CarsProvider} from "../../providers/cars/cars";
// import {NativeStorage} from "@ionic-native/native-storage";
import {Storage} from "@ionic/storage";
import { PublicShared } from '../../models/public-shared';
import {Currency} from "../../models/currency";

@IonicPage({
  name:"payment"
})
@Component({
  selector: 'page-car-payment',
  templateUrl: 'car-payment.html',
})
export class CarPaymentPage {
  showCasheInput: boolean = false;
  showBalanceInput: boolean = false;
  mySite = {} as site;
  myCar = {} as Car;
  Ticket : any;
   price : any;
  //paidAmount: number;
  DocAmount;
  currencies: Array<any> = [];
  showCustomer: boolean = false;
  defaultCurrencyCode;
  netAmount;
  exchangeNetAmount = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams ,
              private alertCtrl : AlertController,
              private carService : CarsProvider,
              // private storage : NativeStorage
              private storage : Storage
  ) {
  }
  closeCustomer(event) {
    if (event) {
      this.showCustomer = false;
    }
  }
  ShowCustomerEntry() {
    this.showCustomer = true;
    console.log(this.showCustomer);
  }
  ionViewDidEnter() {
    this.Ticket = this.navParams.get("Ticket");
    this.netAmount = this.Ticket.DocAmount - this.Ticket.AdvancedPayment;
    console.log(this.Ticket);
    this.getCountryName();

    this.defaultCurrencyCode =  PublicShared.CurrentSite.CurrencyCode;
      this.Ticket.CurrencyCode = PublicShared.CurrentSite.CurrencyCode;

    // this.myCar.transDate = new Date(this.Ticket.TrxDateFrom);
    // console.log("trans date ");
    // console.log(this.myCar.transDate);
    // this.transSeconds = Math.floor(Date.parse(this.Ticket.TrxDateFrom));
    // this.myCar.duration = Math.floor(this.Ticket.timeDuration);
      this.getCurrencies();
    //this.carService.GetPrice(this.Ticket.BarCode).subscribe((res) => {
    //  if (res.StatusType > 0) {
    //    this.alertCtrl.create({ title: "Error !", message: res.Message }).present();
    //    return;
    //  }
    //  this.Ticket.DocAmount = res.Data;
    //  console.log(this.Ticket.DocAmount);
    //}, () => {
    //  this.alertCtrl.create({ title: "Server error", message: "Please try again later", buttons: ["Ok"] }).present()
    //})
  }

  addCustomer()
  {
    this.alertCtrl.create({
      title : "Customer Info",
      inputs : [
        {
          type : "text",
          placeholder :  "Enter Customer Name",
          name : "cusName",
          value : this.Ticket.CustomerName == null ? ""  : this.Ticket.CustomerName
        },
        {
          type : "text",
          placeholder :  "Enter Customer Number",
          name : "cusNum",
          value : this.Ticket.CUSTNMBR == null ? ""  : this.Ticket.CUSTNMBR
        },
        {
          type : "text",
          placeholder :  "Enter Customer Phone Number",
          name : "cusPhone",
          value : this.Ticket.CustomerPhoneNumber == null ? ""  : this.Ticket.CustomerPhoneNumber
        }
      ],
      buttons : [
        {
          text : "Cancel",
          role :  "cancel"
        },
        {
          text : "Save Customer",
          handler : (data)=>
          {
            this.carService.saveCustomerInfo(this.Ticket.BarCode , data.cusPhone , data.cusNum , data.cusName)
                .subscribe((res)=>
                {
                  if (res.StatusType > 0)
                  {
                    this.alertCtrl.create({
                      title : "Error !",
                      message : res.Message
                    }).present();
                    return;
                  }

                  this.Ticket.CustomerName = data.cusName;
                  this.Ticket.CUSTNMBR = data.cusNum;
                  this.Ticket.CustomerPhoneNumber = data.cusPhone;
                  console.log(res)
                } , (error)=>
                {
                  console.log(error)
                })
          }
        }
      ]
    }).present()
  }
  getCurrencies()
  {
    this.currencies = Currency.currencies;
  }


  goCash() {
    this.showCasheInput = true;
  }
  CashOK() {
      let temp  = PublicShared.CurrentUserName.toString().trim();
      this.carService.saveCash(this.Ticket.BarCode, temp, this.Ticket.CollectedAMT , this.Ticket.DocAmount , this.Ticket.CurrencyCode)
        .subscribe((res) => {
          if (res.StatusType > 0) {
            this.alertCtrl.create({ title: "Error !", message: res.Message }).present();
            return;
          } else
            this.navCtrl.pop();
        }, () => {
          this.alertCtrl.create({ title: "Server error", message: "Please try again later", buttons: ["Ok"] }).present()
        })
  }


  goCredit() {
    this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to purchase by credit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }
      ]
    }).present();
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

  cancelPayment()
  {
    this.Ticket.CollectedAMT = 0;
    this.showCasheInput = false;
  }

  getExchange()
  {
    if(this.defaultCurrencyCode !== this.Ticket.CurrencyCode)
    {
       this.carService.getExchange(this.Ticket.CurrencyCode, this.Ticket.CollectedAMT)
         .subscribe((res)=>
         {
           this.exchangeNetAmount = this.netAmount * res.Data;
           console.log("after exchange" , res.Data)
         })
    }
    else
    {
      this.exchangeNetAmount = this.netAmount;
    }
  }
}
