import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from "ionic-angular";
import { User } from "../../models/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireObject } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs-compat";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user = {} as User;
  resUser: Observable<any>;
  profileRef: AngularFireObject<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
  }

  async login(user: User) {
    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();
    try {
      this.afAuth.auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(tawo => {
          this.afStore
            .collection("profile")
            .doc(tawo.user.uid)
            .get()
            .subscribe(querySnapshot => {
              loader.dismiss();

              if (querySnapshot.data().firstlogin == true) {
                this.navCtrl.setRoot("RegisterprofilePage");
              } else {
                this.navCtrl.setRoot("TabsPage");
              }
            });
        })
        .catch(e => {
          loader.dismiss();
          const alert = this.alertCtrl.create({
            title: "Oh no!",
            subTitle: e.message,
            buttons: ["OK"]
          });
          alert.present();
        });
    } catch (e) {
      loader.dismiss();
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push("RegisterPage");
  }
}
