import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs-compat';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: string = "MainPage"
  tab12: string = "SearchPage" 
  tab2: string = "CalendarPage" 
  tab3: string = "ChatPage"
  tab4: string = "ProfilePage"
  learner: boolean = false;
  utype :  Observable<any>;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
   private afStore: AngularFirestore) {

      this.utype = this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).valueChanges();
      this.utype.subscribe(res => {
            if(res.type != 'Tutor'){
              this.learner = true;
              console.log('User is a learner! '+ res.type)
            }
            else{
              console.log('User is a tutor! '+ res.type)
            }
      })

      // this.afAuth.authState.subscribe(auth => {
      //   this.typeRef = this.afDatabase.object('profile/'+ auth.uid)
      //   this.utype = this.typeRef.valueChanges();
      //   this.utype.subscribe(res => {
      //     if(res.type != 'Tutor'){
      //       this.learner = true;
      //       console.log('User is a learner! '+ res.type)
      //     }
      //     else{
      //       console.log('User is a tutor! '+ res.type)
      //     }
      //   })
      // })

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    
  }

}
