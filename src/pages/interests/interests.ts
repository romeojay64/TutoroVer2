import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from '../../models/profile';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {

  

  

  selectedArray :any = [];
 
  profile = {} as Profile
  user: any
  searchTerm: string = '';
 
  subjects = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
   private app: App, private afStore: AngularFirestore, public loadingCtrl: LoadingController, public dataService: DataProvider) {
 
    let loader = this.loadingCtrl.create({
      content: 'Please wait ...'
    })
    loader.present();
    this.initializeItems();
    loader.dismiss();
    
  }





  initializeItems() {
    
    this.afStore.collection('interests').doc('uyeUjV7YYpTxpV2bBNRk').get().subscribe(ref =>{
      // console.log(ref.data().subjects);
      this.subjects = ref.data().subjects;
      
    })
  }

  selectInterests(data) {
    this.selectedArray.push(data);
  }

  done() {
    
    this.selectedArray.forEach(ele => {
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
        "interests": firebase.firestore.FieldValue.arrayUnion(ele)
      })  
    })
    this.rawt();
    
  }

  rawt() {
    this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe((documentSnapshot) => {  
      if(documentSnapshot.data().type == "Tutor"){
        this.navCtrl.push('AvailabilityPage');
      } else {
        this.navCtrl.setRoot('TabsPage');
      }
    })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.subjects = this.subjects.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
  }

 

  goback(){
    this.navCtrl.pop();
  }

}
