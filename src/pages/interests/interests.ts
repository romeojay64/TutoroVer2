import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {

  public subjects = [
    { val: 'Programming'},
    { val: 'Database Mngt'},
    { val: 'Networking'}
  ];


  selectedArray :any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase, private app: App) {
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

  selectInterests(data){
    
      this.selectedArray.push(data);
    
   console.log(this.selectedArray);
  }

  done() {
    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.object('interests/'+ auth.uid).set(this.selectedArray)
      .then(() => 
      // this.navCtrl.push('ProfilepicPage'));
      this.app.getRootNavs()[0].setRoot('ProfilepicPage'));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestsPage');
  }

}
