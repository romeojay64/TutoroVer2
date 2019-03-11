import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
// import firebase from 'firebase';
import * as firebase from "firebase/app";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs-compat";

@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('profile');
  

  tutors: Observable<any[]>;

  constructor(
    public http: HttpClient,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore
  ) {
    this.tutors = this.afStore
      .collection("profile", ref => ref.where("type", "==", "Tutor").where("include","==",true).orderBy("avgrating"))
      .valueChanges();
    console.log("Hello UserProvider Provider");
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser
        .updateProfile({
          displayName: this.afAuth.auth.currentUser.displayName,
          photoURL: imageurl
        })
        .then(() => {
          this.afStore
            .collection("profile")
            .doc(firebase.auth().currentUser.uid)
            .update({
              photoURL: imageurl
            })
            .then(() => {
              resolve({ success: true });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
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
    });
    return promise;
  }

  updateid(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser
        .updateProfile({
          displayName: this.afAuth.auth.currentUser.displayName,
          photoURL: imageurl
        })
        .then(() => {
          this.afStore
            .collection("profile")
            .doc(firebase.auth().currentUser.uid)
            .update({
              idURL: imageurl
            })
            .then(() => {
              resolve({ success: true });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
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
    });
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
    return this.afStore
      .collection("profile")
      .doc(firebase.auth().currentUser.uid)
      .valueChanges();
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

  getTutors() {
    return this.tutors;
  }
  resetTutors() {
    return this.afStore
      .collection("profile", ref => ref.where("type", "==", "Tutor"))
      .valueChanges();
  }
  getFilteredtutorsbySubj(subj) {
    return this.afStore
      .collection("profile", ref =>
        ref
          .where("interests", "array-contains", subj)
          .where("type", "==", "Tutor")
          .where("include","==",true)
          .orderBy("avgrating", "desc")
      )
      .valueChanges();
  }
  getFilteredtutorsbyLevel(level, subj) {
    return this.afStore
      .collection("profile", ref =>
        ref
          .where("teaches." + level, "==", true)
          .where("interests", "array-contains", subj)
          .where("type", "==", "Tutor")
          .where("include","==",true)
          .orderBy("avgrating", "desc")
      )
      .valueChanges();
  }

  getFilteredtutorsbrgy(brgy, subj) {
    return this.afStore
      .collection("profile", ref =>
        ref
          .where("brgy", "==", brgy)
          .where("interests", "array-contains", subj)
          .where("type", "==", "Tutor")
          .where("include","==",true)
          .orderBy("avgrating", "desc")
      )
      .valueChanges();
  }
  // getFilteredtutorsbyBoth(subj, level) {
  //   console.log("BOTH");
  //   return this.afStore
  //     .collection("profile", ref =>
  //       ref
  //         .where("teaches." + level, "==", true)
  //         .where("interests", "array-contains", subj)
  //         .where("type", "==", "Tutor")
  //     )
  //     .valueChanges();
  // }
  getFilteredtutorsbyBoth(level, brgy, subj) {
    console.log("BOTH");
    return this.afStore
      .collection("profile", ref =>
        ref
          .where("brgy", "==", brgy)
          .where("teaches." + level, "==", true)
          .where("interests", "array-contains", subj)
          .where("type", "==", "Tutor")
          .where("include","==",true)
          .orderBy("avgrating", "desc")
      )
      .valueChanges();
  }
  search(subj) {
    return this.afStore
      .collection("profile", ref =>
        ref
          .where("interests", "array-contains", subj)
          .where("type", "==", "Tutor")
          .where("include","==",true)
          .orderBy("avgrating", "desc")
      )
      .valueChanges();

  }
  besttutors(){
    return this.afStore
      .collection("profile", ref =>
        ref
          .where("type", "==", "Tutor")
          .where("include","==",true)
          .orderBy("avgrating", "desc")
      )
      .valueChanges();
  }
}
