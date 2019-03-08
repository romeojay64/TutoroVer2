import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { Observable } from 'rxjs-compat';
import { Profile } from '../../models/profile';

/**
 * Generated class for the AdmintutordetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admintutordetails',
  templateUrl: 'admintutordetails.html',
})
export class AdmintutordetailsPage {

  id: string;
  userprofile  = {} as User
  profileData = {} as Profile
  user: any;
  utype :  Observable<any>;
  ptype :  Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStore: AngularFirestore, public alertCtrl: AlertController) {
    this.id = this.navParams.get('tutor')
    this.utype = this.afStore.collection('users').doc(this.id).valueChanges();
      this.utype.subscribe(res => {
      this.userprofile.fname = res.fname;
      this.userprofile.lname = res.lname;
      this.userprofile.contactno = res.contactno;
      this.userprofile.email = res.email;
      this.userprofile.isVerified = res.isVerified;
      console.log(this.userprofile);
      })

      this.ptype = this.afStore.collection('profile').doc(this.id).valueChanges();
      this.ptype.subscribe(res => {
     
      this.profileData.course = res.course;
      this.profileData.educlevel = res.educlevel;
      this.profileData.gender = res.gender;
      this.profileData.profession = res.profession;
      this.profileData.school = res.school ;
    
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmintutordetailsPage');
  }

}
