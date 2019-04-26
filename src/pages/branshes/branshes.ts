import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { CarsProvider } from '../../providers/cars/cars';
import { Storage } from '@ionic/storage'
import { PublicShared } from '../../models/public-shared';
import { FCM } from '@ionic-native/fcm';
import {Currency} from "../../models/currency";
@IonicPage({
  name: "branshes"
})

@Component({
  selector: 'page-branshes',
  templateUrl: 'branshes.html',
})

export class BranshesPage {

  username: string;
  branches: Array<any>;
  branchesBackUp: Array<any>;
  disableButtons: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private alertCtrl: AlertController,
    private carsService: CarsProvider,
    private fcm: FCM,
    private storage: Storage
  ) {
  }

  ionViewDidEnter() {
    if (PublicShared.CurrentUserName == null || PublicShared.CurrentUserName == '') {
      this.navCtrl.setRoot("login");
    }
    else {
      this.getSites();
    }
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout ?',
      message: 'Do you want to logout ?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.storage.clear()
              .then(() => {
                this.navCtrl.setRoot("login");
              })
          }
        }
      ]
    });
    confirm.present();
  }

  getSites() {
    this.carsService.getSites(PublicShared.CurrentUserName).subscribe((res) => {
      if (res.StatusType > 0) {
        this.alertCtrl.create({ title: "Error !", message: res.Message , buttons : ["Ok"] }).present();
        return;
      }
      this.branches = res.Data;
    }, (error) => {
      this.toast.create({ message: `No response`, duration: 3000, position: "top" }).present();
    })
  }
  initialize() {
    //this.branches = this.branchesBackUp;
  }
  getItem(event) {
    let val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.branches = this.branches.filter((item) => {
        return (item.SiteName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

    }
  }

  selectBransh(site: any, brand, color, status, type, curCode) {
    this.disableButtons = true;
    let siteId = site.SiteID;
    PublicShared.CurrentSite.SiteName = site.SiteName;
    PublicShared.CurrentSite.SiteID = site.SiteID;
    PublicShared.CurrentSite.VehicleBrand = brand;
    PublicShared.CurrentSite.VehicleColor = color;
    PublicShared.CurrentSite.VehicleStatus = status;
    PublicShared.CurrentSite.VehicleType = type;
    PublicShared.CurrentSite.CurrencyCode = curCode;
    //PublicShared.CurrentSite.Scratchs = Scratchs;
    //PublicShared.CurrentSite.ScratchImage = ScratchImage;
    this.carsService.getGates(siteId).subscribe((gates) => {
      if (gates.Data) {
        PublicShared.GateList = gates.Data;

        this.carsService.getSubSites(siteId).subscribe((subsites) => {
          if (subsites.Data) {
            PublicShared.ParkingList = subsites.Data;
            this.fcm.getToken().then((token) => {
                    PublicShared.CurrentUserToken = token;
                    let model = {
                      UserName: PublicShared.CurrentUserName,
                      Token: PublicShared.CurrentUserToken,
                      SiteID: PublicShared.CurrentSite.SiteID
                    };
                    this.carsService.LoginToSite(model).subscribe(() => {
                      this.carsService.getCurrencyTypes()
                        .subscribe((res)=>
                        {
                          Currency.currencies = res.Data;
                          this.navCtrl.setRoot("trans");
                        });
                    }, (err) => {
                      console.log(err);
                    });
            });

          }
        }, (err) => {
          this.disableButtons = false;
          console.log(err);
          this.showServerError();
        })

      }
    }, (err) => {
      this.disableButtons = false;
      console.log(err);
      this.showServerError()
    });
  }

  showServerError() {
    this.alertCtrl.create({
      title: "Server Error",
      message: "Try again later please",
      buttons: ["Ok"]
    }).present()
  }
}
