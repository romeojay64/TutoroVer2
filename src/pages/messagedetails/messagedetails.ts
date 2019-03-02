import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html',
})
export class MessagedetailsPage {

  tutorid: any;
  messagedetails: any;
  tutor: boolean;
  senderid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStore: AngularFirestore) {
    this.senderid = this.navParams.get('learnerid');
    this.tutorid  = this.navParams.get('tutorid');
    this.afStore.collection('user').doc(firebase.auth().currentUser.uid).get().subscribe(ref => {
      if(ref.data().type == "Tutor"){
        console.log('You are a tutor!')
        this.tutor = true;
        this.afStore.collection('messages', ref =>
        ref.where("sender", "==", this.senderid).where("reciever", "==", firebase.auth().currentUser.uid)).valueChanges().subscribe(ref => {
          this.messagedetails = ref;
         console.log(this.messagedetails);
        });
       
      } else {
        console.log('You are NOT a tutor!')
        this.tutor = false;
        this.afStore.collection('messages', ref =>
        ref.where("sender", "==", firebase.auth().currentUser.uid).where("reciever", "==", this.tutorid)).valueChanges().subscribe(ref => {
          this.messagedetails = ref;
         console.log(this.messagedetails);
        });
        
      }
    });
    
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagedetailsPage');
    
  }

}
