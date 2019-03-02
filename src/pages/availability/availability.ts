import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html',
})
export class AvailabilityPage {

  public adlaw = [
    { val: 'Monday'},
    { val: 'Tuesday'},
    { val: 'Wednesday'},
    { val: 'Thursday'},
    { val: 'Friday'},
    { val: 'Saturday'},
    { val: 'Sunday'},
  ];
  

  selectedDays :any = [];
  flex: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private app: App, private afStore: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityPage');
  }

  selectDays(data){
    this.selectedDays.push(data);

  }

  

  done() {
    console.log(this.flex);

    this.selectedDays.forEach(ele => {
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
        ["days." + ele]: true
      })
    })

    if(this.flex){
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
        isFlexible : true
      });
    } else {
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
        isFlexible : false
      });
    }
    
   
    this.rawt();
    
  }

  rawt() {
    this.afStore.collection('user').doc(firebase.auth().currentUser.uid).get().subscribe((documentSnapshot) => {  
      if(documentSnapshot.data().type == "Tutor"){
        this.navCtrl.push('WillingtoteachPage');
      } else {
        this.navCtrl.setRoot('TabsPage');
      }
    })
  }

  goback(){
    this.navCtrl.pop();
  }



}
