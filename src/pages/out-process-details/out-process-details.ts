import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import {CarsProvider} from "../../providers/cars/cars";
import { DamagesDrawPage } from '../damages-draw/damages-draw';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {PublicShared} from "../../models/public-shared";

@IonicPage({
  name : "inProcessTrans"
})
@Component({
  selector: 'page-in-process-details',
  templateUrl: 'out-process-details.html',
})
export class InProcessDetailsPage {

  myCar;
  userEmail : string;
  allInfo : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private carProvider : CarsProvider,
              private alertCtrl : AlertController,
              private modalCtrl : ModalController,
              private camera : Camera
  )
  {
  }

  ionViewDidEnter() {
    this.allInfo = this.navParams.get("Ticket");
    this.userEmail = this.navParams.get("userEmail");
     if (this.allInfo)
        this.myCar = new Date(this.allInfo.TrxDateFrom);
  }

  resumeTrans()
  {
    this.carProvider.RetrieveCancel(this.allInfo.BarCode)
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

           this.navCtrl.popToRoot()
         } , ()=>
         {
            this.alertCtrl.create({
              title : "Server error",
              message : "Please try again later",
                buttons : ["Ok"]
            }).present()
         })
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
                    value : this.allInfo.CustomerName == null ? ""  : this.allInfo.CustomerName
                },
                {
                    type : "text",
                    placeholder :  "Enter Customer Number",
                    name : "cusNum",
                    value : this.allInfo.CUSTNMBR == null ? ""  : this.allInfo.CUSTNMBR
                },
                {
                    type : "text",
                    placeholder :  "Enter Customer Phone Number",
                    name : "cusPhone",
                    value : this.allInfo.CustomerPhoneNumber == null ? ""  : this.allInfo.CustomerPhoneNumber
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
                        this.carProvider.saveCustomerInfo(this.allInfo.BarCode , data.cusPhone , data.cusNum , data.cusName)
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

                                this.allInfo.CustomerName = data.cusName;
                                this.allInfo.CUSTNMBR = data.cusNum;
                                this.allInfo.CustomerPhoneNumber = data.cusPhone;
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

    drawDamages()
    {
      this.modalCtrl.create(DamagesDrawPage)
        .present()
    }

    handover()
    {
        console.log("all info");
        console.log(this.allInfo);

        this.navCtrl.push("handover-notification-center", {ticket : this.allInfo})
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
      this.modalCtrl.create("cameraModal" , {img : base64Image , ticket : this.allInfo}).present()
    }, (err) =>
    {
      this.alertCtrl.create({
        title: "Try again later !",
        message: err,
        buttons: ["Ok"]
      }).present();
    });
  }

  saveRelease()
  {
    this.carProvider.saveRelease(this.allInfo.BarCode, PublicShared.CurrentUserName)
      .subscribe((res)=>
      {
        console.log(res)
      })
  }
}
