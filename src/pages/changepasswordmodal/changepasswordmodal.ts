import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs-compat';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-changepasswordmodal',
  templateUrl: 'changepasswordmodal.html',
})
export class ChangepasswordmodalPage {

  newpassword: string;
  utype :  Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public toastCtrl: ToastController,
    private afStore: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordmodalPage');
  }

  save(){
    let credential
    this.utype = this.afStore.collection('users').doc(firebase.auth().currentUser.uid).valueChanges();
      this.utype.subscribe(res => {
        credential = res.email;      
      })


    firebase.auth().currentUser.updatePassword(this.newpassword).then(function() {
      firebase.auth().sendPasswordResetEmail(credential);
      let toast = this.toastCtrl.create({
        message: 'Successfully changed your password',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.pop();
    }).catch(function(error) {
      console.log(error);
      const alert = this.alertCtrl.create({
        title: 'Oh no!',
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }


}
