import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController,
  AlertController
} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";

@IonicPage({
  name : "cameraModal"
})
@Component({
  selector: 'page-camera-modal',
  templateUrl: 'camera-modal.html',
})
export class CameraModalPage {

    image : string = "";
    ticket : any;
    loading;
    disableButtons : boolean = false;
    imagesList : Array<string> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl : ViewController,
              private toast : ToastController,
              private loader : LoadingController,
              private camera : Camera,
              private alertCtrl : AlertController
  ) {
  }

  ionViewDidLoad()
  {
    this.image = this.navParams.get("img");
    this.imagesList.push(this.image);
    this.ticket =  this.navParams.get("ticket");

     this.loading = this.loader.create({
      content : "Please wait...",
      enableBackdropDismiss : true
    });
  }

  dismiss()
  {
    this.viewCtrl.dismiss()
        .then(()=>
        {
            this.loading.dismiss();
        });
  }

  save()
  {
    try
    {
        this.disableButtons = true;

      this.loading.present();
       if (this.image !== null && this.ticket !== null)
       {
           console.log("ticket");
          console.log(this.ticket);
       }
    }
    catch (e)
    {
      this.loading.dismiss();

      this.toast.create({
        message: "something went wrong !",
        duration : 2000,
        position : "top"
      }).present().then(()=>{
          this.disableButtons = false;
      });

      console.log(e);
    }
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
      this.imagesList.push(base64Image);

    }, (err) =>
    {
      this.alertCtrl.create({
        title: "Try again later !",
        message: err,
        buttons: ["Ok"]
      }).present();
    });
  }
}
