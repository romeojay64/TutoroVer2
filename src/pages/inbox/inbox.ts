import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";


@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  tutor :  boolean;
  learnermessages: any;
  tutormessages: any;
  imgurl =
  "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e";

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStore: AngularFirestore) {
    this.afStore.collection('user').doc(firebase.auth().currentUser.uid).get().subscribe(ref => {
      if(ref.data().type == "Tutor"){
        console.log('You are a tutor!')
        this.tutor = true;
        this.gettutormessages();
      } else {
        console.log('You are NOT a tutor!')
        this.tutor = false;
        this.getlearnermessages();
      }
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

  getlearnermessages() {
    this.afStore.collection('messages', ref =>
    ref.where("sender", "==", firebase.auth().currentUser.uid)).valueChanges().subscribe(ref => {
      this.learnermessages = ref;
      
      
    });
  
  }

  gettutormessages() {
    this.afStore.collection('messages', ref =>
    ref.where("reciever", "==", firebase.auth().currentUser.uid)).valueChanges().subscribe(ref => {
      this.tutormessages = ref;
     console.log(this.tutormessages);
    });
  
  }

  openmessage(tutor: string, learner: string) {
    this.navCtrl.push('MessagedetailsPage', { tutorid: tutor, learnerid: learner });
    // console.log(tutor);
  }

}
