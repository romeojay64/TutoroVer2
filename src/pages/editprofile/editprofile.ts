import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../models/profile';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs-compat';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  profile = {} as Profile;
  utype :  Observable<any>;
  fname: string;
  lname: string;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStore: AngularFirestore,
    public userservice: UserProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().subscribe((res: any) => {
      this.profile = res;
      this.utype = this.afStore.collection('user').doc(firebase.auth().currentUser.uid).valueChanges();
      this.utype.subscribe(res => {
        this.fname = res.fname;        
        this.lname = res.lname;        
      })
    })
  }

  save() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.afStore
      .collection("profile")
      .doc(firebase.auth().currentUser.uid)
      .set(this.profile).then(() => {
        this.afStore
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .update({
        'fname': this.fname,
        'lname': this.lname
      }).then(() => {
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: "Changes saved",
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      });
      });

    
      
      
  }

}
