import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { Interest } from '../../models/interest';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  avatar: string;


  profileData : Observable<any>
  subjects : Observable<Interest>
  subjectArray = []

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
  public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider, public loadingCtrl: LoadingController,
    private afStore: AngularFirestore ){
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().subscribe((res: any) => {
      this.profileData = res;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        loader.dismiss();
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          this.zone.run(() => {
          this.avatar = url;
        })  
        }  
      }).catch((err) => {
          statusalert.setTitle('Failed');
          statusalert.setSubTitle('Your profile pic was not changed');
          statusalert.present();
      })
      })
  }

  ionViewDidLoad() {
    // this.loaduserdetails();
    // this.afAuth.authState.subscribe(data => {
    //   if(data && data.email && data.uid) {
    //     this.profileData = this.afDatabase.object('profile/'+data.uid).valueChanges();
    //     this.afDatabase.list('interests/'+data.uid).valueChanges()
    //     .subscribe(datas => {
    //         console.log(datas);
            
    //         datas.forEach(sub => {
    //           this.subjectArray.push(sub);
    //         });

    //     }, (err) => {
    //       console.log(err);
    //     });
    
    //   // this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
    // }
  
    // });
  }

}
