import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from "firebase/app";
import { AngularFirestore } from '@angular/fire/firestore';
import { connreq } from '../../models/requests';

@IonicPage()
@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html',
})
export class MessagedetailsPage {

  newrequest = {} as connreq;
  tutorid: any;
  messagedetails: any;
  tutor: boolean;
  senderid: any;
  imgurl =
  "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e";

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStore: AngularFirestore,
    public alertCtrl: AlertController) {
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

  accept(sender){
    

      this.afStore.collection("messages").doc(sender+"_"+firebase.auth().currentUser.uid).update({
          'isAccepted': true 
        }).then(() => {
        const alert = this.alertCtrl.create({
          title: 'Alright!',
          subTitle: 'You accepted the offer. Please wait for the tutor to contact you.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      })
        
      

  }

  reject(){
    
  }

}
