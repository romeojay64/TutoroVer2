import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController  } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-askage',
  templateUrl: 'askage.html',
})
export class AskagePage {

  profile = {} as Profile

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
     private app: App, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskagePage');
  }

  check() {
    const today = new Date().getFullYear();
    const inputdate = new Date(this.profile.dob).getFullYear();
    console.log(today);
    console.log(inputdate);
    if(inputdate < today - 17){
      console.log('Good to proceed!');
      this.proceed();
    }
    else {
     
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
  //   this.afAuth.authState.subscribe(auth => {
  //     this.afDatabase.object('profile/'+ auth.uid).set(this.profile)
  //     .then(() => this.navCtrl.push('InterestsPage'));
  //   })
  this.navCtrl.push('RegisterPage')
  }

}
