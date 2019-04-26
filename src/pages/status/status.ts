import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, AlertController, ModalController} from 'ionic-angular';
import {CarsProvider} from "../../providers/cars/cars";
import {DamagesDrawPage} from "../damages-draw/damages-draw";
import { PublicShared } from '../../models/public-shared';

@IonicPage({
  name: "status"
})
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  status : Array<any> = [];
  Ticket : any;
  selected : number = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private carService : CarsProvider,
              private toast : ToastController,
              private alertCtrl : AlertController,
              private modalCtrl : ModalController,
              private publicShared : PublicShared
) {
}


  ionViewDidEnter() {
      this.Ticket = this.navParams.get("Ticket");
      this.Ticket.TrxDateFrom = new Date(this.Ticket.TrxDateFrom);

    this.Ticket.CurrencyCode = PublicShared.CurrentSite.CurrencyCode;

    this.selected = PublicShared.Ticket.VehicleStatusID;
    this.getStatus();
  }

  getStatus()
  {
    this.carService.getStatus()
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

          this.status = res.Data;
          console.log("status");
          console.log(res.Data)
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
        })
  }

  goRetrieve()
  {
    this.navCtrl.setRoot("retrieval-info", {Ticket : this.Ticket});
  }

  saveCar(id)
  {
    this.Ticket.StatusId = id;
    try
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
        })
    }
    catch (e)
    {
       this.alertCtrl.create({
           title: 'Try Again Later Please',
           message: e
       })
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
          this.navCtrl.popToRoot();
        } , (err)=>
        {
            this.alertCtrl.create({
                title : "Server Error",
                message : "Please try again later",
                buttons : ["Ok"]
            }).present()
                .then(()=>{
                    if(this.publicShared.inProcessUser)
                        this.goRetrieve();
                    else
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

  drawDamages()
  {
    this.modalCtrl.create(DamagesDrawPage)
      .present()
  }
}
