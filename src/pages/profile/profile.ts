import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Interest } from '../../models/interest';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileData : Observable<any>
  subjects : Observable<Interest>
  subjectArray = []

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase ){
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.profileData = this.afDatabase.object('profile/'+data.uid).valueChanges();
        this.afDatabase.list('interests/'+data.uid).valueChanges()
        .subscribe(datas => {
            console.log(datas);
            
            datas.forEach(sub => {
              this.subjectArray.push(sub);
            });

        }, (err) => {
          console.log(err);
        });
    
      // this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
    }
  
    });
  }

}
