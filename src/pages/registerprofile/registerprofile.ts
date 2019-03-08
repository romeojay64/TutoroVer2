import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Profile } from "../../models/profile";
import * as firebase from "firebase/app";

@IonicPage()
@Component({
  selector: "page-registerprofile",
  templateUrl: "registerprofile.html"
})
export class RegisterprofilePage {

  profile = {} as Profile;
  public cities = [
    {name: 'Cebu City'},
  ];

  public brgys = [
    {name: 'Adlaon'},
    {name: 'Agsungot'},
    {name: 'Apas'},
    {name: 'Babag'},
    {name: 'Basak pardo'},
    {name: 'Bacayan'},
    {name: 'Banilad'},
    {name: 'Basak San Nicolas'},
    {name: 'Banilaw'},
    {name: 'Bonbon'},
    {name: 'Budla-an (Pob.)'},
    {name: 'Buhisan'},
    {name: 'Bulacao'},
    {name: 'Buot-Taup Pardo'},
    {name: 'Busay (Pob.)'},
    {name: 'Calamba'},
    {name: 'Cambinocot'},
    {name: 'Capitol Site (Pob.)'},
    {name: 'Carreta'},
    {name: 'Central (Pob.)'},
    {name: 'Cogon Ramos (Pob.)'},
    {name: 'Cogon Pardo'},
    {name: 'Day-as'},
    {name: 'Duljo (Pob.)'},
    {name: 'Ermita (Pob.)'},
    {name: 'Guadalupe'},
    {name: 'Guba'},
    {name: 'Hippodromo'},
    {name: 'Kalubihan (Pob.)'},
    {name: 'Kalunasan'},
    {name: 'Kamagayan (Pob.)'},
    {name: 'Camputhaw (Pob.)'},
    {name: 'Kasambagan'},
    {name: 'Kinasang-an Pardo'},
    {name: 'Labangon'},
    {name: 'Lahug (Pob.)'},
    {name: 'Lorega (Lorega San Miguel)'},
    {name: 'Luz'},
    {name: 'Mabolo'},
    {name: 'Malubog'},
    {name: 'Pahina Central (Pob.)'},
    {name: 'Pahina San Nicolas'},
    {name: 'Pardo (Pob.)'},
    {name: 'Pari-an'},
    {name: 'Paril'},
    {name: 'Pasil'},
    {name: 'Pit-os'},
    {name: 'Pulangbato'},
    {name: 'Pung-ol-Sibugay'},
    {name: 'Punta Princesa'},
    {name: 'Quiot Pardo'},
    {name: 'Sambag I (Pob.)'},
    {name: 'Sambag II (Pob.)'},
    {name: 'San Antonio (Pob.)'},
    {name: 'San Jose'},
    {name: 'San Nicolas Central'},
    {name: 'San Roque (Ciudad)'},
    {name: 'Santa Cruz (Pob.)'},
    {name: 'Sawang Calero (Pob.)'},
    {name: 'Sinsin'},
    {name: 'Sirao'},
    {name: 'Suba Pob. (Suba San Nicolas)'},
    {name: 'Sudlon I'},
    {name: 'Sapangdaku'},
    {name: 'T. Padilla'},
    {name: 'Tabunan'},
    {name: 'Tagbao'},
    {name: 'Talamban'},
    {name: 'Taptap'},
    {name: 'Tejero (Villa Gonzalo)'},
    {name: 'Tinago'},
    {name: 'Tisa'},
    {name: 'To-ong Pardo'},
    {name: 'Zapatera'},
    {name: 'Sudlon II'},
];

  public days = [
    'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
   'Sunday',
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.profile.uid = firebase.auth().currentUser.uid;
    this.afStore.collection("users").doc(firebase.auth().currentUser.uid).get().subscribe(ref => {
        this.profile.type = ref.data().type;
        this.profile.displayName = ref.data().fname;
        this.profile.buddycounter = 0;
      });
  }

  ionViewDidLoad() {
    
  }

  setDays() {
    this.days.forEach(ele => {
      this.afStore
        .collection("profile")
        .doc(firebase.auth().currentUser.uid)
        .update({
          ["days." + ele]: false
        });

    });
  }

  setLevel() {
    this.Levels.forEach(ele => {
      this.afStore
        .collection("profile")
        .doc(firebase.auth().currentUser.uid)
        .update({
          ["teaches." + ele]: false
        });

    });
  }

  createProfile() {
    this.afStore
      .collection("profile")
      .doc(firebase.auth().currentUser.uid)
      .update(this.profile);
      this.setDays();
      this.navCtrl.push("QualificationsPage");
    
        // if (this.profile.type == "Tutor") {
        //   this.setLevel();
        //   this.navCtrl.push("QualificationsPage");
        // } else {
        //   this.navCtrl.push("ProfilepicPage");
        // }
  }
}
