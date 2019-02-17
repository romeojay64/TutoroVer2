import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Profile } from '../../models/profile';


@IonicPage()
@Component({
  selector: 'page-registerprofile',
  templateUrl: 'registerprofile.html',
})
export class RegisterprofilePage {

  profile = {} as Profile

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterprofilePage');
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

  createProfile() {
    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object('profile/'+ auth.uid).set(this.profile)
      .then(() => this.navCtrl.push('InterestsPage'));
    })
  }

}
