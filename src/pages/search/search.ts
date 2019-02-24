import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as Lodash from 'lodash'; 
// import { Profile } from '../../models/profile';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { UserProvider } from '../../providers/user/user';
import { AngularFirestore } from '@angular/fire/firestore';

import { Profile } from '../../models/profile';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit{

   

  userArray: Observable<any[]>
  // userArray = [];
  userinterestsArray: Observable<any[]>
  // userinterestsArray=[]
  avatar: string;
  subjectArray= []
  temparr = [];
  filteredusers = [];
  
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  tutors: Profile[];
 
  
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase, private userservice: UserProvider, private afStore: AngularFirestore) {

      

    //  afStore.collection('profile', ref => ref.where('type','==', 'Tutor')).get().subscribe(function(querySnapshot) {
    //   querySnapshot.docs.forEach(doc => {
    //     console.log(doc.data());   
    //     this.tutors.push(doc.data());
    //   });
      // this.userArray = querySnapshot.docs.map(function (documentSnapshot) {
      //   return documentSnapshot.data();
      // })
      
        // querySnapshot.forEach(element => {
        //   this.userArray = element.data();
          
        //   console.log(element.data());   
        //   console.log(this.userArray);   

        // });
      // });
      

    //   this.userservice.getallusers().then((res: any) => {
    //     this.filteredusers = res;
    //     this.temparr = res;
    //  })

    //    this.userArray = this.afDatabase.list('profile', ref => ref.orderByChild('type').equalTo('Tutor'))
    //   .snapshotChanges()
    //   .pipe(map(items => {             // <== new way of chaining
    //     return items.map(a => {

         
          
    //       const data = a.payload.val();
    //       const key = a.payload.key;

    //       return {key, ...data};  
    //                // or {key, ...data} in case data is Obj
    //     });

        
    //   }));

      //  this.afDatabase.list('profile', ref => ref.orderByChild('type').equalTo('Tutor'))
      // .snapshotChanges()
      // .subscribe(res => {
      //   this.userArray = res;
      //   console.log(this.userArray);
      // })


      
  }

  ngOnInit(){
    this.userservice.getTutors().subscribe(items => {
      this.tutors = items;
    })
  }



  goToDetailPage(tutor) {
    console.log(tutor);
    this.navCtrl.push('TutordetailPage', {tutorid  : tutor});
  };

  messageTutor(tutor) {
    this.navCtrl.push('InitialmessagePage', {tutorid  : tutor});
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    
    
     
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
