import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../models/profile';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-registerprofile',
  templateUrl: 'registerprofile.html',
})
export class RegisterprofilePage {

  

  profile = {} as Profile

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase, private afStore: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterprofilePage');
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

  createProfile() {
    
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).set(this.profile)
      .then(() =>  this.navCtrl.push('InterestsPage'));
       
      }
      // 

    // this.afAuth.authState.subscribe(auth => {
    //   this.afDatabase.object('profile/'+ auth.uid).set(this.profile)
    //   .then(() => this.navCtrl.push('InterestsPage'));
    // })
  

}
