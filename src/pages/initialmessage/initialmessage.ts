import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs-compat';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../models/profile';
import { Message } from '../../models/message';
import * as firebase from "firebase/app";
import { ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-initialmessage',
  templateUrl: 'initialmessage.html',
})
export class InitialmessagePage {

  params: any;
  profileData = {} as Profile
  forSelect: any;
  forSelectLevels: any = [];
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
  public teaches = [
    {'PreSchool' : false},
    {'Elementary':  false},
    {'HighSchool': false},
    {'JuniorHighSchool': false},
    {'SeniorHighSchool': false},
    {'CollegeUndergraduate': false},
    {'Adult': false},
  ];
  messageform: FormGroup;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afStore: AngularFirestore, public toastCtrl: ToastController) {

      this.messageform = new FormGroup({
        topic: new FormControl('', [Validators.required]),
        level: new FormControl('', [Validators.required]),
        place: new FormControl('', [Validators.required]),
        subject: new FormControl('', [Validators.required]),
        message: new FormControl('', [Validators.required])
      });

    this.params  = this.navParams.get('tutorid');
    this.initialmessage.topic  = this.navParams.get('topic');
    this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).valueChanges().subscribe((res: any) => {
      this.initialmessage.senderfname = res.displayName;
      
      if(res.photoURL){
        console.log("It exists!");
        this.initialmessage.senderphotoURL = res.photoURL;
      } else {
        this.initialmessage.recieverphotoURL = "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e"
      }
    })
    this.afStore.collection('profile').doc(this.params).valueChanges().subscribe((res: any) => {
      this.profileData = res;
      this.initialmessage.reciever = this.params;
   
      if(res.photoURL){
        console.log("It exists!");
        this.initialmessage.recieverphotoURL = res.photoURL;
      } else {
        this.initialmessage.recieverphotoURL = "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e"
      }
         
      this.initialmessage.sender = firebase.auth().currentUser.uid;
      this.initialmessage.recieverfname = res.displayName;
      this.initialmessage.isAccepted = false;
      this.initialmessage.isRead = false;
      this.initialmessage.isBuddies = false;
      this.initialmessage.isArchived = false;
      let petsa = new Date();
      // petsa.getDate();
      
      
      let stringDate = petsa.getFullYear().toString() + petsa.getMonth().toLocaleString() + petsa.getDate().toLocaleString() + petsa.getHours().toLocaleString() + petsa.getMinutes().toLocaleString() + petsa.getSeconds().toLocaleString() + petsa.getMilliseconds().toLocaleString();
      // this.initialmessage.timesentrequest = parseInt(stringDate);
      this.initialmessage.timesentrequest = new Date()
      this.forSelect = this.profileData.interests;
      if(this.profileData.teaches.PreSchool) {
        this.forSelectLevels.push("Pre-School");
      }
      if(this.profileData.teaches.Elementary) {
        this.forSelectLevels.push("Elementary");
      }
      if(this.profileData.teaches.HighSchool) {
        this.forSelectLevels.push("High School");
      }
      if(this.profileData.teaches.JuniorHighSchool) {
        this.forSelectLevels.push("Junior High School");
      }
      if(this.profileData.teaches.SeniorHighSchool) {
        this.forSelectLevels.push("Senior High School");
      }
      if(this.profileData.teaches.CollegeUndergraduate) {
        this.forSelectLevels.push("College Undergraduate");
      }
      if(this.profileData.teaches.Adult) {
        this.forSelectLevels.push("Adult");
      }

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
        duration: 4000,
        position: 'bottom'
      });

      toast.present();
      
      this.navCtrl.pop();
    
  }

}
