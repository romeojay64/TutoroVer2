import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  tutor :  boolean;
  tutorapprovedmessages: any;
  learnerapprovedmessages: any;
  imgurl =
  "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e";

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider,
    private afStore: AngularFirestore) {
    this.afStore.collection('users').doc(firebase.auth().currentUser.uid).get().subscribe(ref => {
      if(ref.data().type == "Tutor"){
        console.log('You are a tutor!')
        this.tutor = true;
        this.gettutorapprovedrequests();
      } else {
        console.log('You are NOT a tutor!')
        this.tutor = false;
        this.getlearnerapprovedrequests();
      }
    });
  }

  buddychat(buddy, buddypic) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push('BuddychatPage', {buddypic: buddypic, buddyid: buddy});
  }

  gettutorapprovedrequests() {
    this.afStore.collection('messages', ref =>
    ref.where("reciever", "==", firebase.auth().currentUser.uid).where("isAccepted", "==", true).where("isBuddies", "==", true)).valueChanges().subscribe(ref => {
      this.tutorapprovedmessages = ref;
     console.log(this.tutorapprovedmessages);
    });
  
  }

  getlearnerapprovedrequests() {
    this.afStore.collection('messages', ref =>
    ref.where("sender", "==", firebase.auth().currentUser.uid).where("isAccepted", "==", true).where("isBuddies", "==", true)).valueChanges().subscribe(ref => {
      this.learnerapprovedmessages = ref;
     console.log(this.learnerapprovedmessages);
    });
  
  }

  ionViewDidLoad() {
    
  }

  



}
