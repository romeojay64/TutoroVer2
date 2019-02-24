import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
/**
 * Generated class for the WillingtoteachPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-willingtoteach',
  templateUrl: 'willingtoteach.html',
})
export class WillingtoteachPage {

  public level = [
    { val: 'Pre-School'},
    { val: 'Elementary'},
    { val: 'High School'},
    { val: 'Junior High School'},
    { val: 'Senior High School'},
    { val: 'College Undergraduate'},
    { val: 'College'},
  ];

  selectedArray :any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase, private app: App, private afStore: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WillingtoteachPage');
  }

  selectlevel(data){
    
    this.selectedArray.push(data);
  
 console.log(this.selectedArray);
}

  done() {

    this.selectedArray.forEach(ele => {
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
        "teaches": firebase.firestore.FieldValue.arrayUnion(ele)
      })  
    })
    
      this.app.getRootNavs()[0].setRoot('ProfilepicPage');
  }

}
