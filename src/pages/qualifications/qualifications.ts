import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile';
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-qualifications',
  templateUrl: 'qualifications.html',
})
export class QualificationsPage {

  profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStore: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QualificationsPage');
  }

  done(){
    this.afStore
    .collection("profile")
    .doc(firebase.auth().currentUser.uid)
    .update(this.profile)
    .then(()=>{
      this.rawt();
    })
    ;
  }

  rawt() {
    this.afStore.collection('users').doc(firebase.auth().currentUser.uid).get().subscribe((documentSnapshot) => {  
      if(documentSnapshot.data().type == "Tutor"){
        this.navCtrl.push('InterestsPage');
      } else {
        this.navCtrl.setRoot('TabsPage');
      }
    })
  }


  goback(){
    this.navCtrl.pop();
  }

}
