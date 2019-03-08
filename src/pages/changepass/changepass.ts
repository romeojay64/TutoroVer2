import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs-compat';
import { AngularFirestore } from '@angular/fire/firestore';

/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  newpassword: string;
  utype :  Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public toastCtrl: ToastController, public alertCtrl: AlertController,
     private afStore: AngularFirestore) {
  }

  ionViewDidLoad() {
    

    
    console.log('ionViewDidLoad ChangepassPage');
  }

  save(){
    let credential
    this.utype = this.afStore.collection('users').doc(firebase.auth().currentUser.uid).valueChanges();
      this.utype.subscribe(res => {
         credential = res.email;   
         firebase.auth().sendPasswordResetEmail(credential);  
         let toast = this.toastCtrl.create({
          message: 'Check your email to change your password',
          duration: 3000,
          position: 'bottom'
        }); 
        toast.present();
        this.navCtrl.pop();
      })

      // firebase.auth().currentUser.updatePassword(this.newpassword).then(() => {
        
        
        
      // });
      
  }

}
