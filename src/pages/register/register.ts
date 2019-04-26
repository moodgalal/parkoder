import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {User} from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@IonicPage(
    {
        name:"register"
    }
)
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;  
    result : any;

    private currentUser: firebase.User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams ,
              private afAuth : AngularFireAuth ,
              private toast :  ToastController,
              private viewCtrl : ViewController

  )
  {
      afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
      this.viewCtrl.showBackButton(true);
  }

    get authenticated(): boolean {
        return this.currentUser !== null;
    }

         register()
        {
            this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
                .then(()=>
                {
                    this.navCtrl.push("branshes");
                })
                   .catch((error) =>
               {
                   let errorMessage = error.message;
                   this.toast.create({
                       message : `${errorMessage}`,
                       duration:2000,
                       position:"top",
                   }).present()

               });

           }
        }

