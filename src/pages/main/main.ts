import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
// import { Observable } from 'rxjs-compat';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
     private app: App) {
      
    
  }

  ionViewDidLoad() {
    
    
  
  }

  logout() {
    this.afAuth.auth.signOut();
    // this.navCtrl.setRoot('LoginPage');
    this.app.getRootNav().setRoot('LoginPage');
  }

  interest() {
 
    this.navCtrl.setRoot('InterestsPage');
    
  }

  profilepic() {
 
    this.navCtrl.setRoot('ProfilepicPage');
    
  }

  askage() {
 
    this.navCtrl.setRoot('AskagePage');
    
  }

  avail() {
 
    this.navCtrl.setRoot('AvailabilityPage');
    
  }

  pay() {
 
    this.navCtrl.setRoot('PaypalPage');
    
  }

}
