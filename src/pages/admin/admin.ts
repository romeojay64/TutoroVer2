import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, 
    private app: App,
    private afStore: AngularFirestore, public alertCtrl: AlertController) {
      this.afStore.collection('users', ref => ref.where("type", "==", 'Tutor' )).valueChanges().subscribe(ref => {
     this.users = ref;
      
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  logout() {
    this.afAuth.auth.signOut();
    // this.navCtrl.setRoot('LoginPage');
    this.app.getRootNav().setRoot('LoginPage');
  }

  viewprofile(tutor){
    this.navCtrl.push('AdmintutordetailsPage', {tutor: tutor});
  }

}
