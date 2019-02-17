import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs-compat';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase, private app: App) {
      
    
  }

  ionViewDidLoad() {
    
    
  
  }

  logout() {
    this.afAuth.auth.signOut();
    // this.navCtrl.setRoot('LoginPage');
    this.app.getRootNavs()[0].setRoot('LoginPage');
  }

  interest() {
 
    this.navCtrl.setRoot('InterestsPage');
    
  }

  profilepic() {
 
    this.navCtrl.setRoot('ProfilepicPage');
    
  }

}
