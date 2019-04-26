import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PublicShared} from "../../models/public-shared";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage({
  name: "profile"
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    username : string;
    siteId : number;
    siteName : string;
    showChangePassword : boolean = false;
    disableButtons  : boolean = false;
    currentPass : string;
    newPass: string;
    confirmPass: string;
    photo : string;
    extension : string;
    dangerousPhotoUrl : string = `http://80.241.220.137:5050/Uploads/Images/Users/`;
    safePhotoUrl : any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sanitizer : DomSanitizer
  ) {
  }



  ionViewDidLoad() {
    this.extension = PublicShared.CurrentUserExt;
    if(this.extension)
    {
      this.photo = PublicShared.CurrentUserName + "." + PublicShared.CurrentUserExt;
      this.dangerousPhotoUrl += this.photo;
      this.safePhotoUrl = this.sanitizer.bypassSecurityTrustUrl(this.dangerousPhotoUrl);
    }
    this.getProfileData();
  }

  getProfileData()
  {
    this.username = PublicShared.CurrentUserName;
    this.siteId = PublicShared.CurrentSite.SiteID;
    this.siteName = PublicShared.CurrentSite.SiteName;
  }

    showChangePass()
    {
        this.showChangePassword = !this.showChangePassword;
    }

    changePass()
    {
       this.disableButtons = true;

       let model =
           {
               LoginName:this.username,
               CurrentPassword:this.currentPass,
               NewPassword:this.newPass,
               ConfirmPassword:this.confirmPass
           };
    }
}
