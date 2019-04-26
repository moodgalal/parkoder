import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {CarsProvider} from "../../providers/cars/cars";
import { PublicShared } from '../../models/public-shared';
import { Brands } from '../../models/brands';

@IonicPage({
  name : "brands"
})
@Component({
  selector: 'page-brands',
  templateUrl: 'brands.html'
})
export class BrandsPage {

  rightBrandsBackup : Array<any> = [
    {brandId : 1 , name : "Audi" , image : 'Audi-logo.png'},
    {brandId : 2 ,name : "BMW", image : 'BMW-logo.png'},
    {brandId : 3 ,name : "Cadillac", image : 'Cadillac-logo.png'},
    {brandId : 4 ,name : "Chevrolet", image : 'Chevrolet-logo.png'},
    {brandId : 5 ,name : "Dodge", image : 'Dodge-logo.png'},
    {brandId : 6 ,name : "Ford", image : 'Ford-logo.png'},
    {brandId : 7 ,name : "GMC", image : 'GMC-logo.png'},
    {brandId : 8 ,name : "Honda", image : 'Honda-logo.png'},
    {brandId : 10 ,name : "Hyundai", image : 'Hyundai-logo.png'},
    {brandId : 11, name : "Infiniti", image : 'Infiniti-logo.png'},
  ];

  leftBrandsBackup : Array<any> = [
    {brandId : 12 ,name : "KIA", image : 'Kia-logo.png'},
    {brandId : 13 ,name : "Mazda", image : 'Mazda-logo.png'},
    {brandId : 14 ,name : "Mercedes", image : 'Mercedes-logo.png'},
    {brandId : 15 ,name : "Mitsubishi", image : 'Mitsubishi-logo.png'},
    {brandId : 16 ,name : "Nissan", image : 'Nissan-logo.png'},
    {brandId : 17 ,name : "Porsche", image : 'Porsche-logo.png'},
    {brandId : 18 ,name : "Land Rover", image : 'Land-Rover-logo.png'},
    {brandId : 19 ,name : "Toyota", image : 'Toyota-logo.png'},
    {brandId : 20 ,name : "Volkswagen", image : 'Volkswagen-logo.png'},
    {brandId : 21 ,name : "Lexus", image : 'Lexus-logo.png'},
  ];

  allBrandsBackup : Array<any> = Brands.brandsList;
  rightBrands : Array<any> = [];
  leftBrands : Array<any> = [];

  Ticket: any = null;
  selected : number = null;
  color : boolean;
  type : boolean;
  status : boolean;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public carService : CarsProvider,
      private alertCtrl : AlertController,
      private publicShared : PublicShared
  ) {
  }


  ionViewDidEnter() {
    this.Ticket = this.navParams.get("Ticket");
     this.initialize();
    this.color = PublicShared.CurrentSite.VehicleColor;
    this.type = PublicShared.CurrentSite.VehicleType;
    this.status = PublicShared.CurrentSite.VehicleStatus;
    this.selected = PublicShared.Ticket.VehicleBrandID;
  }
 async goColor(brandId) {
    this.Ticket.VehicleBrandID = brandId;
    PublicShared.Ticket.VehicleBrandID = brandId;
    if (PublicShared.CurrentSite.VehicleColor == false && this.type == false && this.status == false) {
    await  this.SaveBrand(brandId, 5);
      if(this.publicShared.inProcessUser)
        this.goRetrieve();
      else
        this.goHome();
      return;
    } else
    {
      this.SaveBrand(brandId, -1);
    }
    if (PublicShared.CurrentSite.VehicleColor) {
      this.navCtrl.push("colors", { Ticket: this.Ticket });
    }
    else if (PublicShared.CurrentSite.VehicleType) {
      this.navCtrl.push("types", { Ticket: this.Ticket });
    }
    else if (PublicShared.CurrentSite.VehicleStatus) {
      this.navCtrl.push("status", { Ticket: this.Ticket });
    }
  }

  SaveBrand(brandId, RecordStatusID) {
    this.carService.SaveBrand(this.Ticket.BarCode, brandId, RecordStatusID).subscribe((res) => {
    }, () => {
      this.alertCtrl.create({ title: "Server Error", message: "Try again later Please", buttons: ["Ok"] }).present()
    });
  }

  initialize()
  {
     this.leftBrands = this.leftBrandsBackup;
     this.rightBrands = this.rightBrandsBackup;
  }

  getItem(event)
  {
    this.initialize();
    let searchValue = event.target.value;

    if (searchValue || searchValue.trim() != "")
    {
      this.leftBrands = this.allBrandsBackup.slice(0, 22);
      this.rightBrands = this.allBrandsBackup.slice(22 + 1);

      this.leftBrands = this.leftBrands.filter((item)=>
      {
        return (item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      });

      this.rightBrands = this.rightBrands.filter((item)=>
      {
        return (item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      });
    }
  }

  goHome()
  {
    this.navCtrl.popToRoot();
  }

  goRetrieve()
  {
    this.navCtrl.setRoot("retrieval-info", {Ticket : this.Ticket});
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
          value: this.Ticket.CustomerName == null ? "" : this.Ticket.CustomerName
        },
        {
          type : "text",
          placeholder :  "Enter Customer Number",
          name : "cusNum",
          value: this.Ticket.CUSTNMBR == null ? "" : this.Ticket.CUSTNMBR
        },
        {
          type : "text",
          placeholder :  "Enter Customer Phone Number",
          name : "cusPhone",
          value: this.Ticket.CustomerPhoneNumber == null ? "" : this.Ticket.CustomerPhoneNumber
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
