import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs-compat';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Events } from 'ionic-angular';

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
  tab5: string = "InboxPage"
  learner: boolean = false;
  utype :  Observable<any>;
  inboxbadge: number = null;
  chatbadge: number = null;
  temp: number;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
   private afStore: AngularFirestore, private alertCtrl: AlertController, public toastCtrl: ToastController,
   public events: Events, public zone: NgZone,) {

    this.events.subscribe('badgecount', () => {
      // this.gettutormessages();
     
        // this.inboxbadge = this.inboxbadge - 1; 
     
        this.inboxbadge = null;

        this.utype = this.afStore.collection('users').doc(firebase.auth().currentUser.uid).valueChanges();
        this.utype.subscribe(res => {
              if(res.type != 'Tutor'){
                this.learner = true;
                // this.getlearnermessages();
                this.getlearnerapprovedrequests();
                console.log('User is a learner! '+ res.type)
              }
              else{
                this.gettutormessages();
                // this.gettutorapprovedrequests();
                console.log('User is a tutor! '+ res.type)
              }
        })
     
      
      
    }) 
     

      this.utype = this.afStore.collection('users').doc(firebase.auth().currentUser.uid).valueChanges();
      this.utype.subscribe(res => {
            if(res.type != 'Tutor'){
              this.learner = true;
              // this.getlearnermessages();
              this.getlearnerapprovedrequests();
              console.log('User is a learner! '+ res.type)
            }
            else{
              this.gettutormessages();
              // this.gettutorapprovedrequests();
              console.log('User is a tutor! '+ res.type)
            }
      })
    

  }

  ionViewDidEnter() {

  }
  

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad TabsPage');
    
    
  }

 
  // gettutormessages() {
 
  //   let count: number;
  //   firebase.firestore().collection('messages').where("isRead", "==", false).where("reciever", "==", firebase.auth().currentUser.uid).onSnapshot(function(doc){
  //     count =  doc.size ;
  //     console.log('count: '+count);
  //     if(this.inboxbadge != null){
  //       this.inboxbadge = this.inboxbadge + count;   
  //     } else {
  //       this.inboxbadge = 0;
  //       this.inboxbadge = this.inboxbadge + count;  
  //     }
      
  //     console.log('inboxbadge: '+this.inboxbadge);
  //   })
  

    gettutormessages() {
      this.afStore.collection('messages', ref =>
      ref.where("reciever", "==", firebase.auth().currentUser.uid).where("isAccepted", "==", false)).valueChanges().subscribe(ref => {
        
        
        console.log(ref);
        
                
                if(ref.length > 0){
                  this.inboxbadge = ref.length;  
                } 
              
       
       console.log("InboxBadge: "+ this.inboxbadge);
      });
    
    }

    // gettutorapprovedrequests() {
      
    //   this.afStore
    //     .collection("messages", ref =>
    //       ref
    //         .where("reciever", "==", firebase.auth().currentUser.uid)
    //         .where("isAccepted", "==", true)
    //         .where("isBuddies", "==", false)
    //         .orderBy("timeacceptedrequest","desc")
    //     )
    //     .valueChanges()
    //     .subscribe(ref => {
    //       if (ref.length > 0) {
           
    //         this.inboxbadge = this.inboxbadge  + ref.length;  
    //       } 
  
    //     });
    // }
    

  //   getlearnermessages() {
      
  //    this.afStore
  //      .collection("messages", ref => ref.where("sender", "==", firebase.auth().currentUser.uid).where("isAccepted", "==", false).orderBy('timesentrequest')).valueChanges().subscribe(ref => {
  //        if (ref.length > 0) {
  //         this.inboxbadge = this.inboxbadge  + ref.length;  
  //        } 
  //      });
  //  }

   getlearnerapprovedrequests() {
   
    this.afStore
      .collection("messages", ref =>
        ref
          .where("sender", "==", firebase.auth().currentUser.uid)
          .where("isAccepted", "==", true)
          .where("isBuddies", "==", false)
          .orderBy("timeacceptedrequest", "desc")
      )
      .valueChanges()
      .subscribe(ref => {
        if (ref.length > 0) {
          this.inboxbadge = this.inboxbadge  + ref.length;  
        } 
       
      });
  }
  

 

}
