import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { Car, site } from "../../models/car";
import {CarsProvider} from "../../providers/cars/cars";
// import {NativeStorage} from "@ionic-native/native-storage";
import {Storage} from "@ionic/storage";
import { DamagesDrawPage } from '../damages-draw/damages-draw';
import { PublicShared } from '../../models/public-shared';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {AlertInputOptions} from "ionic-angular/components/alert/alert-options";


@IonicPage({
  name:"trans-detail"
})
@Component({
  selector: 'page-trans-details',
  templateUrl: 'trans-details.html',
})
export class TransDetailsPage {
  Ticket: any = {};
  myCar = {} as Car;
  price : any;
  countryName: string;
  carDuration: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private carService: CarsProvider,
    // private storage : NativeStorage,
    private storage: Storage,
    private modalCtrl : ModalController,
    private camera : Camera
  ) {
  }
  ionViewDidEnter() {
    this.Ticket = this.navParams.get("Ticket");
    this.Ticket.TimeIn = new Date(this.Ticket.TrxDateFrom);
    this.Ticket.outTime = new Date();
    this.carDuration = this.Ticket.timeDuration;
    this.getCountryName();
    if (this.Ticket.IsPaid === 0) {
      this.carService.GetPrice(this.carDuration, PublicShared.CurrentSite.SiteID).subscribe((res) => {
          this.Ticket.DocAmount = res.Data;
        //this.allInfo.Points = 0
      }, () => {
        this.alertCtrl.create({ title: "Server error", message: "Please try again later", buttons: ["Ok"] }).present()
      })
    }
  }

  retrieve() {
    if (PublicShared.CurrentGate.GateID <= 0)
    {
      this.showGates();
      return;
    }
      this.carService.retrieveHold(PublicShared.CurrentUserName,this.Ticket.BarCode, PublicShared.CurrentGate.GateID)
        .subscribe(() => {
          this.navCtrl.push("retrieve-request", { Ticket: this.Ticket });
        })

  }

  payment() {
      this.carService.retrieveRequest(this.Ticket.UserNameIn, this.Ticket.BarCode)
        .subscribe(() => {
          this.navCtrl.push("payment", { Ticket: this.Ticket });
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
          value: this.Ticket.CustomerName == null ? "" : this.Ticket.CustomerName
        },
        {
          type : "text",
          placeholder :  "Enter Customer Number",
          name : "cusNum",
          value: this.Ticket.CUSTNMBR == null || this.Ticket.CUSTNMBR == "null" ? "" : this.Ticket.CUSTNMBR
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
                      title : "Server Error !",
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


  getCountryName() {
    this.storage.get('countries').then(data => {
      //console.log(data);
      if (data != null) {
        data.map((country) => {
          //console.log(country);
          if (country.CountryCode == this.Ticket.CountryCode) {
            this.countryName = country.CountryName;
          }
        })
      }
    });
  }

  Cancel() {
    this.navCtrl.pop();
  }

  drawDamages()
  {
    this.modalCtrl.create(DamagesDrawPage)
      .present()
  }

  takePic()
  {
    const options: CameraOptions =
      {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
    this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.modalCtrl.create("cameraModal" , {img : base64Image , ticket : this.Ticket}).present()
    }, (err) =>
    {
      this.alertCtrl.create({
        title: "Try again later !",
        message: err,
        buttons: ["Ok"]
      }).present();
    });
  }

  showGates() {
    let alertOptions: Array<AlertInputOptions> = [];
    let schema: any = {};
    let x = 0;
    for (x; x < PublicShared.GateList.length; x++) {
      schema = {
        type: "radio",
        label: PublicShared.GateList[x].GateName,
        value: PublicShared.GateList[x].GateID,
        checked: PublicShared.GateList[x].GateID == PublicShared.CurrentGate.GateID
      };
      alertOptions.push(schema)
    }
    this.alertCtrl.create({
      title: "Select Gate",
      inputs: alertOptions,
      buttons: [
        {
          text: "Close",
        },
        {
          text: "Select",
          handler: (value) => {
            PublicShared.CurrentGate.GateID = value;
            this.retrieve();
          }
        }
      ]
    }).present()
  }

}
