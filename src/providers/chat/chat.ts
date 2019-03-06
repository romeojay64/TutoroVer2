import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Events } from 'ionic-angular';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class ChatProvider {

  buddy: any; 
  firebuddychats = firebase.database().ref('buddychats');
  buddymessages = [];
  db = firebase.firestore();
  constructor(public http: HttpClient, public events: Events, private afStore: AngularFirestore) {
    console.log('Hello ChatProvider Provider');
  }

initializebuddy(buddy) {
  this.buddy = buddy;
}

// addnewmessage(msg){
//   if (this.buddy) {
//     var promise = new Promise((resolve, reject) => {
//       this.afStore.collection('buddychats').doc(firebase.auth().currentUser.uid).set({
//         [this.buddy]: {sentby: firebase.auth().currentUser.uid,
//                        message: msg,
//                        timestamp: firebase.database.ServerValue.TIMESTAMP 
//                       } 
//       }).then(() => {
//         this.afStore.collection('buddychats').doc(this.buddy).set({
//           [firebase.auth().currentUser.uid]: {sentby: firebase.auth().currentUser.uid,
//                          message: msg,
//                          timestamp: firebase.database.ServerValue.TIMESTAMP 
//                         } 
//       }).then(() => {
//         resolve(true);
//       }).catch((err) => {
//         reject(err);
//       })
//     })
//   })
//   return promise;
//   }
// }

addnewmessage(msg) {

  console.log(this.buddy);
  if (this.buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy).push({
        sentby: firebase.auth().currentUser.uid,
        message: msg,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        this.firebuddychats.child(this.buddy).child(firebase.auth().currentUser.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          resolve(true);
          }).catch((err) => {
            reject(err);
        })
      })
    })
    return promise;
  }
}

// getbuddymessages() {
    
//   // let temp;
//   this.afStore.collection('buddychats').doc(firebase.auth().currentUser.uid).valueChanges().subscribe(msg => {
//     console.log(msg);
//     this.events.publish('newmessage');
//   })

//   // this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', (snapshot) => {
//   //   this.buddymessages = [];
//   //   temp = snapshot.val();
//   //   for (var tempkey in temp) {
//   //     this.buddymessages.push(temp[tempkey]);
//   //   }
//   //   this.events.publish('newmessage');
//   // })
// }

getbuddymessages() {
    
  let temp;
  this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy).on('value', (snapshot) => {
    this.buddymessages = [];
    temp = snapshot.val();
    for (var tempkey in temp) {
      this.buddymessages.push(temp[tempkey]);
    }
    this.events.publish('newmessage');
  })
}

}
