import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-editavail',
  templateUrl: 'editavail.html',
})
export class EditavailPage {

  public days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  selectedDays: any = [];
  flex: boolean;
  public adlaw = [
    {'Monday' : false},
    {'Tuesday':  false},
    {'Wednesday': false},
    {'Thursday': false},
    {'Friday': false},
    {'Saturday': false},
    {'Sunday': false},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private afStore: AngularFirestore) {
    this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe((querySnapshot) => {
      console.log(querySnapshot.exists);
      if(querySnapshot.exists) {
        this.flex = querySnapshot.data().isFlexible;
        if(querySnapshot.data().days.Monday){

          console.log("Monday true");
          this.adlaw[0].Monday = true;
        }
        if(querySnapshot.data().days.Tuesday){
          console.log("Tuesday true");
          this.adlaw[1].Tuesday = true;
        }
        if(querySnapshot.data().days.Wednesday){
          console.log("Wednesday true");
          this.adlaw[2].Wednesday = true;
        }
        if(querySnapshot.data().days.Thursday){
          console.log("Thursday true");
          this.adlaw[3].Thursday = true;
        }
        if(querySnapshot.data().days.Friday){
          console.log("Friday true");
          this.adlaw[4].Friday = true;
        }
        if(querySnapshot.data().days.Saturday){
          console.log("Saturday true");
          this.adlaw[5].Saturday = true;
        }
        if(querySnapshot.data().days.Sunday){
          console.log("Sunday true");
          this.adlaw[6].Sunday = true;
        }
      }
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditavailPage');
  }

  addCheckbox(event, checkbox: string) { 
    console.log(event.checked, checkbox);
    
    if ( event.checked ) {
      this.selectedDays.push(checkbox);
      console.log(this.selectedDays);
          // let chosenday = this.days.indexOf(checkbox);
          // this.days.splice(chosenday, 1);
    } else {
      let index = this.removeCheckedFromArray(checkbox);
      this.selectedDays.splice(index,1);
      console.log(this.selectedDays);
    }
  }

  removeCheckedFromArray(checkbox : String) {
    return this.selectedDays.findIndex((category)=>{
      return category === checkbox;
    })
  }

  // selectDays(data) {
  //   this.selectedDays.push(data);
  // }

  done() {

    this.afStore
        .collection("profile")
        .doc(firebase.auth().currentUser.uid)
        .update({
          "days": firebase.firestore.FieldValue.delete()
        }).then(()=> {
          this.selectedDays.forEach(ele => {
            this.afStore
              .collection("profile")
              .doc(firebase.auth().currentUser.uid)
              .update({
                ["days." + ele]: true
              });
          })
          console.log(this.flex);
          if (this.flex) {
              this.afStore
                .collection("profile")
                .doc(firebase.auth().currentUser.uid)
                .update({
                  isFlexible: true
                });
            } else {
              this.afStore
                .collection("profile")
                .doc(firebase.auth().currentUser.uid)
                .update({
                  isFlexible: false
                });
            }
            this.navCtrl.setRoot("ProfilePage");
        })
    
   
    
  }

  


}
