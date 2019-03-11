import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: "page-availability",
  templateUrl: "availability.html"
})
export class AvailabilityPage {

  public days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  selectedDays: any = [];
  flex: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private app: App,
    private afStore: AngularFirestore
  ) {}

  ionViewDidLoad() {
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
    this.rawt();
    
  }

  rawt() {
    this.afStore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .subscribe(documentSnapshot => {
        if (documentSnapshot.data().type == "Tutor") {
          this.navCtrl.push("WillingtoteachPage");
        } else {
          this.navCtrl.setRoot("TabsPage");
        }
      });
  }

  goback() {
    this.navCtrl.pop();
  }

}
