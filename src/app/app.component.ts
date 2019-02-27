import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs-compat";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // rootPage: any = "LoginPage";
  rootPage: any;
  utype: Observable<any>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.initializeApp();
      splashScreen.hide();
    });
  }

  initializeApp() {
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.utype = this.afStore
            .collection("profile")
            .doc(firebase.auth().currentUser.uid)
            .get();
          this.utype.subscribe(querySnapshot => {
            if (querySnapshot.exists) {
              this.rootPage = "TabsPage";
            } else {
              this.rootPage = "LoginPage";
            }
          });
        } else {
          this.rootPage = "LoginPage";
        }
      },
      () => {
        this.rootPage = "LoginPage";
      }
    );
  }
}
