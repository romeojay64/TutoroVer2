import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AlertController  } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-askage',
  templateUrl: 'askage.html',
})
export class AskagePage {

  profile = {} as Profile

  constructor(public navCtrl: NavController, 
     private app: App, public alertCtrl: AlertController) {
  }

  check() {
    const today = new Date().getFullYear();
    const inputdate = new Date(this.profile.dob).getFullYear();
    if(inputdate < today - 17) {
      this.proceed();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Oh no!',
        subTitle: 'You are not allowed to create an account. Ask your parents to register in your behalf.',
        buttons: ['OK']
      });
      alert.present();
      this.app.getRootNavs()[0].setRoot('LoginPage');
      
    
    }
  }

  proceed() {
  this.navCtrl.push('RegisterPage')
  }

}
