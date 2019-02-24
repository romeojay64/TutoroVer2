import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import firebase from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class UserProvider {

  // firedata = firebase.database().ref('profile');
  firedata = firebase.database().ref('users');
  tutors :  Observable<any[]>

  constructor(public http: HttpClient, public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore) {

      this.tutors = this.afStore.collection('profile', ref => ref.where('type','==', 'Tutor')).valueChanges();
    console.log('Hello UserProvider Provider');
  }
  
  

updateimage(imageurl) {
      var promise = new Promise((resolve, reject) => {
          this.afAuth.auth.currentUser.updateProfile({
              displayName: this.afAuth.auth.currentUser.displayName,
              photoURL: imageurl      
          }).then(() => {
            this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
              photoURL: imageurl
            }).then(() => {
              resolve({ success: true });
              }).catch((err) => {
                  reject(err);
              })
      }).catch((err) => {
            reject(err);
         })  
          //     firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          //     displayName: this.afAuth.auth.currentUser.displayName,
          //     photoURL: imageurl,
          //     uid: firebase.auth().currentUser.uid
          //     }).then(() => {
          //         resolve({ success: true });
          //         }).catch((err) => {
          //             reject(err);
          //         })
          // }).catch((err) => {
          //       reject(err);
          //    })  
      })
      return promise;
  }

  getuserdetails() {
    // var promise = new Promise((resolve, reject) => {
     
    // this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
    //   resolve(snapshot.val());
    // }).catch((err) => {
    //   reject(err);
    //   })
    // })
    // return promise;
    return this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).valueChanges();
    
  }

  // getallusers() {
  //   var promise = new Promise((resolve, reject) => {
  //     this.firedata.orderByChild('uid').once('value', (snapshot) => {
  //       let userdata = snapshot.val();
  //       let temparr = [];
  //       for (var key in userdata) {
  //         temparr.push(userdata[key]);
  //       }
  //       resolve(temparr);
  //     }).catch((err) => {
  //       reject(err);
  //     })
  //   })
  //   return promise;
  // }

  getTutors(){
    return this.tutors;
  }

  

}
