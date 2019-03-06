import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider) {
  }

  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push('BuddychatPage');
  }

  ionViewDidLoad() {
    
  }

  



}
