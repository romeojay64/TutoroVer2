import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from '../../models/profile';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {

  // public subjects = [
  //   { val: 'Programming'},
  //   { val: 'Database Mngt'},
  //   { val: 'Networking'}
  // ];

  subjects = []


  selectedArray :any = [];
  profile = {} as Profile
  user: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
   private app: App, private afStore: AngularFirestore) {
    
    this.afStore.collection('interests').doc('uyeUjV7YYpTxpV2bBNRk').get().subscribe(ref =>{
      console.log(ref.data().subjects);
      this.subjects = ref.data().subjects;
    })
  }

  selectInterests(data) {
    this.selectedArray.push(data);
  }

  done() {
    this.selectedArray.forEach(ele => {
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
        "interests": firebase.firestore.FieldValue.arrayUnion(ele)
      })  
    })
    this.rawt();
    
  }

  rawt() {
    this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe((documentSnapshot) => {  
      if(documentSnapshot.data().type == "Tutor"){
        this.navCtrl.setRoot('WillingtoteachPage');
      } else {
        this.navCtrl.setRoot('TabsPage');
      }
    })
  }

}
