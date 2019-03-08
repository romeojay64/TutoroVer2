import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { UserProvider } from '../../providers/user/user';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-validid',
  templateUrl: 'validid.html',
})
export class ValididPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
    public zone: NgZone, public loadingCtrl: LoadingController, public userservice: UserProvider, private afStore: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValididPage');
  }

  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imgservice.uploadimageid().then((uploadedurl: any) => {
     
      this.zone.run(() => {
        loader.dismiss();
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }


  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.userservice.updateid(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot('ProfilepicPage');
      }
      else {
        alert(res);
      }
    })
    this.afStore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        isVerified: true
      });
  }
 
  proceed() {
    this.navCtrl.setRoot('ProfilepicPage');
  }


}
