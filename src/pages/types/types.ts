import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {CarsProvider} from "../../providers/cars/cars";
import { PublicShared } from '../../models/public-shared';

@IonicPage({
  name : "types"
})
@Component({
  selector: 'page-types',
  templateUrl: 'types.html',
})
export class TypesPage {
  Ticket: any = {};
  types : Array<any> = [];
  selected : number = null;
  status : boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private carService : CarsProvider,
              private alertCtrl : AlertController,
              private toast : ToastController,
              private publicShared : PublicShared
  ) {
  }


  ionViewDidEnter() {
    this.Ticket = this.navParams.get("Ticket");
    this.Ticket.TrxDateFrom = new Date(this.Ticket.TrxDateFrom);

    this.Ticket.CurrencyCode = PublicShared.CurrentSite.CurrencyCode;
    this.selected = PublicShared.Ticket.typeId;
    this.getTypes();
          this.status = PublicShared.CurrentSite.VehicleStatus;
  }

  goRetrieve()
  {
    this.navCtrl.setRoot("retrieval-info", {Ticket : this.Ticket});
  }

  getTypes()
  {
    this.carService.getTypes()
        .subscribe(res=>
        {
          if (res.StatusType > 0)
          {
            this.alertCtrl.create({
              title : "Error !",
              message : res.Message
            }).present();
            return;
          }

          this.types = res.Data;
          console.log("types");
          console.log(res.Data)
        })
  }

  goStatus(id)
  {
    this.Ticket.TypeId = id;

    if (this.status == false )
    {
      if(this.publicShared.inProcessUser)
          this.goRetrieve();
      else
          this.goHome();
      return;
    }
    else if (this.status == true )
    {
      this.navCtrl.push("status" , {Ticket : this.Ticket});
      return;
    }
  }

  goHome()
  {
    this.carService.saveCarData(this.Ticket)
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

          console.log("after save car data");
          console.log(res);
          this.toast.create({
            message : "Car data have been saved",
            duration : 2000,
            position :"top"
          }).present().then(()=>
          {
            this.navCtrl.popToRoot();
          });
        } , (err)=>
        {
          this.alertCtrl.create({
            title : "Server Error",
            message : "Please try again later",
            buttons : ["Ok"]
          }).present()
              .then(()=>{
                this.navCtrl.popToRoot();
              });
        });
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
          value : this.Ticket.CustomerName == null ? "" : this.Ticket.CustomerName
        },
        {
          type : "text",
          placeholder :  "Enter Customer Number",
          name : "cusNum",
          value : this.Ticket.CUSTNMBR == null ? "" : this.Ticket.CUSTNMBR
        },
        {
          type : "text",
          placeholder :  "Enter Customer Phone Number",
          name : "cusPhone",
          value : this.Ticket.CustomerPhoneNumber == null ? "" : this.Ticket.CustomerPhoneNumber
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
        },
        {
          text : "Search"
        }
      ]
    }).present()
  }
}
