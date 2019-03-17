import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
  img: string;
  uid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afStore: AngularFirestore,  public modalCtrl: ModalController) {
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
    this.uid = ref.data().uid;
    if(!ref.data().photoURL) {
      this.img = "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e";
    } else {
      this.img = ref.data().photoURL;
    }
    
 
})
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorcontactPage');
  }

  goToDetailPage(){
    this.navCtrl.push("TutordetailPage", {tutorid: this.uid});
  }

  rateTutor(){
    
      const modal = this.modalCtrl.create('RatingmodalPage', {tutorid: this.uid});
      modal.present();
    
  }

}
