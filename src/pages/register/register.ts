import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";
import { Profile } from '../../models/profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User
  profile = {} as Profile

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public afAuth: AngularFireAuth, private afStore: AngularFirestore,  public alertCtrl: AlertController) {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result){
        this.createProfile();
        const alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: "You have successfully registered an account. You can now login.",
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot('LoginPage');
      }
    }
    catch(e){
      console.error(e);
    }
  }

  createProfile() {
    this.afStore
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .set(this.profile);
  }

}
