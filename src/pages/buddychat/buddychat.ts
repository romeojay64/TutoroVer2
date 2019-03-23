import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, LoadingController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import * as firebase from 'firebase/app';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})
export class BuddychatPage {

  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  buddypicurl;
  buddyuid;
  imgornot= [];
  fname; 
  lname;
  email;
  contactno;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider,
    public events: Events, public zone: NgZone, public loadingCtrl: LoadingController,
    public imgstore: ImghandlerProvider, private afStore: AngularFirestore) {
      console.log(this.navParams.get('buddypic'));
       if(this.navParams.get('buddypic') == undefined) {
        this.buddypicurl = "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e";
      } else {
        this.buddypicurl =  this.navParams.get('buddypic');
      }
     
      this.buddyuid =  this.navParams.get('buddyid');
      this.buddy = this.chatservice.buddy;
      
      this.scrollto();

      this.afStore.collection('users').doc(this.buddyuid).get().subscribe(ref => {
        // console.log(ref.data());
        this.fname = ref.data().fname;
        this.lname = ref.data().lname;
        this.email = ref.data().email;
        this.contactno = ref.data().contactno;
      });

      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe(ref => {
        // console.log(ref.data());
        if(ref.data().photoURL == undefined) {
          this.photoURL  = "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e";
        } else {
          this.photoURL = ref.data().photoURL;
        }
       
      
      });

      this.events.subscribe('newmessage', () => {
        this.allmessages = [];
        this.zone.run(() => {
          this.allmessages = this.chatservice.buddymessages;
          for (var key in this.allmessages) {
            if (this.allmessages[key].message.substring(0, 4) == 'http')
              this.imgornot.push(true);
            else
              this.imgornot.push(false);
          }
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddychatPage');
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  sendPicMsg() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.chatservice.addnewmessage(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })
  }

}
