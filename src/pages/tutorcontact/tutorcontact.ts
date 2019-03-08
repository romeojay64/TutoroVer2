import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs-compat';
import { User } from '../../models/user';


@IonicPage()
@Component({
  selector: 'page-tutorcontact',
  templateUrl: 'tutorcontact.html',
})
export class TutorcontactPage {

  tutorid: string;
 
  fname: string;
  lname: string;
  email: string;
  contactno: number;
  school: string;
  educlevel: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStore: AngularFirestore) {
    this.tutorid = this.navParams.get("tutorid");
    this.afStore.collection('users').doc(this.tutorid).get().subscribe(ref => {
  
      this.fname = ref.data().fname;
      this.lname = ref.data().lname;
      this.email = ref.data().email;
      this.contactno = ref.data().contactno;
  })
  this.afStore.collection('profile').doc(this.tutorid).get().subscribe(ref => {
  
    this.school = ref.data().school;
    this.educlevel = ref.data().educlevel;
 
})
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorcontactPage');
  }

}
