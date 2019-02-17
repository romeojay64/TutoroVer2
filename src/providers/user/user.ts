import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import firebase from 'firebase';
import * as firebase from 'firebase/app';

@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('profile');

  constructor(public http: HttpClient, public afAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }
  
  

updateimage(imageurl) {
      var promise = new Promise((resolve, reject) => {
          this.afAuth.auth.currentUser.updateProfile({
              displayName: this.afAuth.auth.currentUser.displayName,
              photoURL: imageurl      
          }).then(() => {
              firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
              displayName: this.afAuth.auth.currentUser.displayName,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid
              }).then(() => {
                  resolve({ success: true });
                  }).catch((err) => {
                      reject(err);
                  })
          }).catch((err) => {
                reject(err);
             })  
      })
      return promise;
  }

}
