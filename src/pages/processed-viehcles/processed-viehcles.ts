import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { PublicShared } from '../../models/public-shared';

@IonicPage({
  name : "processed"
})
@Component({
  selector: 'page-processed-viehcles',
  templateUrl: 'processed-viehcles.html',
})
export class ProcessedViehclesPage {

  processed : Array<any>;
  siteId;
  subsiteId;
    brand : boolean;
    color : boolean;
    type : boolean;
    status : boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams ,
              private alertCtrl : AlertController
  ) {
  }

  ionViewDidEnter()
  {
      this.processed =  this.navParams.get("cars");
      this.siteId = this.navParams.get("siteId");
      this.subsiteId = this.navParams.get("subsiteId");

      this.brand = PublicShared.CurrentSite.VehicleBrand;
      this.color = PublicShared.CurrentSite.VehicleColor;
      this.type = PublicShared.CurrentSite.VehicleType;
      this.status = PublicShared.CurrentSite.VehicleStatus;
  }

  viewDetails(v)
  {
    this.navCtrl.push("trans-detail", {Ticket : v});
  }

  getTime(event , car : any)
  {
    let  date = car.TrxDateFrom;
    let myDate = new Date(date).getTime()/1000;
    car.timeDuration = event -  myDate;
  }

  pressStatus(v)
  {
      console.log("selected status");
      console.log(v);

      console.log("selected status date");
      console.log(v.TrxDateFrom);

      let userEmail : string = PublicShared.CurrentUserName;

                    const info : any  = {
                      SiteId : this.siteId,
                      SubsiteId :  this.subsiteId,
                      EntryUserName: userEmail,
                      BarCode: v.BarCode,
                      PlateNumber: v.PlateNumber,
                      PlateNoPrefix: v.PlateNoPrefix,
                      CountryCode: v.CountryCode,
                      ItemId : v.ItemID,
                      ItemName : v.ItemName,
                      BinId : v.BinID,
                      BinName : v.BinName,
                      TrxDateFrom : v.TrxDateFrom,
                      BrandId: 0,
                      ColorId: 0,
                      TypeId: 0,
                      StatusId: 0
                    };

                        console.log("object in transaction before bins");
                        console.log(info);
                          if (this.brand == false &&this.color == false &&this.type == false &&this.status == false )
                          {
                              this.alertCtrl.create({
                                  title : "Not Authorized",
                                  message : "You can't proceed to this action",
                                  buttons : ["Ok"]
                              }).present();
                              return;
                          }
                          else if (this.brand == true )
                          {
                              this.navCtrl.push("brands" , {Ticket : info});
                              return;
                          }
                          else if (this.color == true )
                          {
                              this.navCtrl.push("colors" , {Ticket : info});
                              return;
                          }
                          else if (this.type == true )
                          {
                              this.navCtrl.push("types" , {Ticket : info});
                              return;
                          }
                          else if (this.status == true )
                          {
                              this.navCtrl.push("status" , {Ticket : info});
                              return;
                          }
    }
}
