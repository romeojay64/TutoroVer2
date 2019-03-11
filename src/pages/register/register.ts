import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";
import { Profile } from '../../models/profile';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  signupform: FormGroup;
  user = {} as User
  profile = {} as Profile
  phoneNumber: any;
  daterange: any;
  dateyear: any;
  dob: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, private afStore: AngularFirestore,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.signupform = new FormGroup({

        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        fname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        lname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        contactno: new FormControl('', [Validators.required,Validators.minLength(11), Validators.maxLength(11)]),
        type: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required])
      });

      this.dateyear = new Date().getFullYear() - 18;
      this.daterange = this.dateyear+"-12-31";

  }

  async register(user: User) {
    let loader = this.loadingCtrl.create({
      content: 'Registering ...'
    })
    loader.present();
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result){
        firebase.auth().currentUser.sendEmailVerification().then(()=>{
          this.createProfile();
          loader.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: "You have successfully registered an account. You can now login.",
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot('LoginPage');
        });
        
       
        
      }
    }
    catch(e){
      const alert = this.alertCtrl.create({
        title: 'Oh no!',
        subTitle: e.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  createProfile() {

    this.afStore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({
        contactno: this.user.contactno,
        email: this.user.email,
        fname: this.user.fname,
        lname: this.user.lname,
        type: this.user.type,
        isVerified: false,
        uid: firebase.auth().currentUser.uid,
       
      });

      if(this.user.type == 'Tutor'){
        this.afStore
        .collection("profile")
        .doc(firebase.auth().currentUser.uid)
        .set({
          dob: this.dob,
          avgrating: 0,
          firstlogin: true,
          isPremium: false,
          include: true
        });
      } else {
        this.afStore
        .collection("profile")
        .doc(firebase.auth().currentUser.uid)
        .set({
          dob: this.dob,
          firstlogin: true
        });
      }
      
  }

}
