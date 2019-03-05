import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs-compat';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../models/profile';
import { Message } from '../../models/message';
import * as firebase from "firebase/app";
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-initialmessage',
  templateUrl: 'initialmessage.html',
})
export class InitialmessagePage {

  params: any;
  profileData = {} as Profile
  forSelect: any;
  initialmessage = {} as Message
  public levels = [
    {val: 'PreSchool', name: 'Pre-School'},
    {val: 'Elementary', name: 'Elementary'},
    {val: 'HighSchool', name: 'High School'},
    {val: 'JuniorHighSchool', name: 'Junior High School'},
    {val: 'SeniorHighSchool', name: 'Senior High School'},
    {val: 'CollegeUndergraduate', name: 'College Undergraduate'},
    {val: 'Adult', name: 'Adult'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afStore: AngularFirestore, public toastCtrl: ToastController) {

    this.params  = this.navParams.get('tutorid');
    this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).valueChanges().subscribe((res: any) => {
      this.initialmessage.senderfname = res.displayName;
    })
    this.afStore.collection('profile').doc(this.params).valueChanges().subscribe((res: any) => {
      this.profileData = res;
      this.initialmessage.reciever = this.params;
      if(res.photoURL){
        console.log("It exists!");
        this.initialmessage.photoURL = res.photoURL;
      } else {
        this.initialmessage.photoURL = "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e"
      }
      
      
      this.initialmessage.sender = firebase.auth().currentUser.uid;
      this.initialmessage.recieverfname = res.displayName;
      this.initialmessage.isAccepted = false;
      this.initialmessage.isRead = false;
      this.initialmessage.isBuddies = false;
      
      
      this.forSelect = this.profileData.interests;
    })
    
  }

  ionViewDidLoad() {
   
  }

  sendmessage() {
    this.afStore
      .collection("messages")
      .doc(firebase.auth().currentUser.uid+"_"+this.initialmessage.reciever)
      .set(
           this.initialmessage
        )
      
      let toast = this.toastCtrl.create({
        message: 'Message was successfully sent',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      
      this.navCtrl.pop();
    
  }

}
