import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';



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

  edit() {
 
    this.navCtrl.push('EdittutorprofilePage');
    
  }

}
