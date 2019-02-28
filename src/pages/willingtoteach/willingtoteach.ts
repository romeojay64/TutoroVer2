import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: "page-willingtoteach",
  templateUrl: "willingtoteach.html"
})
export class WillingtoteachPage {
  public level = [
    { label: "Pre-School", val: "PreSchool" },
    { label: "Elementary", val: "Elementary" },
    { label: "High School", val: "HighSchool" },
    { label: "Junior High School", val: "JuniorHighSchool" },
    { label: "Senior High School", val: "SeniorHighSchool" },
    { label: "College Undergraduate", val: "CollegeUndergraduate" },
    { label: "Adult", val: "Adult" }
  ];


  Levels: any = [
    "PreSchool",
    "Elementary",
    "HighSchool",
    "JuniorHighSchool",
    "SeniorHighSchool",
    "CollegeUndergraduate",
    "Adult"
  ];

  selectedArray: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private app: App
  ) {
    
  }

  ionViewDidLoad() {
  }

  selectlevel(data) {
    this.selectedArray.push(data);
  }

  setLevel() {
    this.Levels.forEach(ele => {
      this.afStore
        .collection("profile")
        .doc(firebase.auth().currentUser.uid)
        .update({
          ["teaches." + ele]: false
        });

      console.log("LEVELS SET");
    });
  }

  done() {
    this.setLevel();
    this.selectedArray.forEach(ele => {
      this.afStore
        .collection("profile")
        .doc(firebase.auth().currentUser.uid)
        .update({
          ["teaches." + ele]: true
        });

        // this.navCtrl.setRoot("ProfilepicPage");
        this.app.getRootNav().setRoot('ProfilepicPage');
    });
  }

  goback(){
    this.navCtrl.pop();
  }
}
