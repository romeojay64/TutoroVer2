import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Profile } from '../../models/profile';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {

  public subjects = [
    { val: 'Programming'},
    { val: 'Database Mngt'},
    { val: 'Networking'}
  ];


  selectedArray :any = [];
  profile = {} as Profile
  user: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase, private app: App, private afStore: AngularFirestore) {
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

  selectInterests(data){
    
    this.selectedArray.push(data);
  
 console.log(this.selectedArray);
}

  done() {
    console.log(this.selectedArray);

    this.selectedArray.forEach(ele => {
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
        "interests": firebase.firestore.FieldValue.arrayUnion(ele)
      })  
    })

    this.rawt();
   
    
    
    // this.navCtrl.push('WillingtoteachPage');

    // this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
    //   "interests": firebase.firestore.FieldValue.arrayUnion(this.selectedArray)
    // })
    // .then(() => this.navCtrl.push('ProfilepicPage'));
    // this.afAuth.authState.subscribe(auth => {
    //   this.afDatabase.object('interests/'+ auth.uid).set(this.selectedArray)
    //   .then(() => 
    //   // this.navCtrl.push('ProfilepicPage'));
    //   this.app.getRootNavs()[0].setRoot('WillingtoteachPage'));
    // })
  }

  rawt(){
    this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe((documentSnapshot) => {
      console.log(documentSnapshot.data().type);
      
      if(documentSnapshot.data().type == "Tutor"){
        this.navCtrl.setRoot('WillingtoteachPage');
      } else {
        this.navCtrl.setRoot('TabsPage');
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestsPage');
  }

}
