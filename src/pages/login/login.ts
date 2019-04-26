import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { CarsProvider } from "../../providers/cars/cars";
import { NotificationProvider } from "../../providers/notification/notification";
import { PublicShared } from '../../models/public-shared';
@IonicPage({
  name: "login"
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  disableButtons: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private auth: CarsProvider,
    private loader: LoadingController,
    private service: NotificationProvider
  ) {

  }

  login() {
    this.disableButtons = true;
    let load = this.loader.create({ content: "Please Wait" });
    load.present();

      this.auth.login(this.user.name, this.user.password).subscribe((res) => {
        load.dismiss();
        if (res.StatusType > 0) {
          this.toast.create({
            message: `You are not authenticated`, position: "top",
            duration: 2000
          }).present().then(() => { this.disableButtons = false; })
        }
        else if (res.StatusType == 0) {
          this.disableButtons = false;
          PublicShared.CurrentUserName = this.user.name.trim();
          PublicShared.CurrentUserExt = res.Data;
          this.navCtrl.setRoot("branshes");
        }
      }, (e) => {
        load.dismiss();
        this.errorMessage();
        console.log(e);
      });
  }

  errorMessage() {
    this.toast.create({
      message: `Try Again Later`,
      position: "top",
      duration: 2000
    }).present()
      .then(() => {
        this.disableButtons = false;
      })
  }
}
