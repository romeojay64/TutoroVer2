import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  list: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userservice: UserProvider,
    private afStore: AngularFirestore) {

      this.getmessages();
  }

  ionViewDidLoad() {
    
  }

  getmessages() {
    this.afStore.collection('messages').doc(firebase.auth().currentUser.uid).get()
  }



}
