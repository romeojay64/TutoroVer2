import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from '../../models/profile';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {

  selectedArray :any = [];
  temparr = [];
  filteredsub  = [];
  asignatura = [
    'Accounting',
    'Ancient History',
    'Anthropology',
    'Archaeology',
    'Art',
    'Astronomy',
    'Basic Skills',
    'Biochemistry',
    'Biology',
    'BMAT',
    'Business Studies',
    'Chemistry',
    'Citizenship Studies',
    'Computing',
    'Criminology',
    'Dentistry',
    'Design and Craft',
    'Design and Technology',
    'Drama',
    'Early Years',
    'Economics',
    'Electronics',
    'Eleven Plus',
    'Engineering',
    'English',
    'Entrance Exams',
    'General Science',
    'General Studies',
    'Geography',
    'Geology',
    'History',
    'Home Economics',
    'Humanities',
    'IELTS',
    'Law',
    'Leisure Studies',
    'Maths',
    'Media',
    'Medicine',
    'Music',
    'Music Technology',
    'Neuroscience',
    'Pathology',
    'Personal Statements',
    'Philosophy',
    'Photography',
    'Physical Education',
    'Physics',
    'Politics',
    'Psychology',
    'Religious Studies',
    'Seven Plus',
    'Sociology',
    'Special Needs',
    'UKCAT',
  ]
  
  profile = {} as Profile
  user: any
  searchTerm: string = '';
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
   private app: App, private afStore: AngularFirestore, public loadingCtrl: LoadingController, public dataService: DataProvider) {

    let loader = this.loadingCtrl.create({
      content: 'Please wait ...'
    })
    loader.present();
    firebase.database().ref('interests').once('value', (snapshot) => {
      let userdata = snapshot.val();
      console.log(userdata);
      for (var key in userdata) {
        console.log(userdata[key]);
        this.temparr.push(userdata[key]);
        this.filteredsub .push(userdata[key]);
      }
      loader.dismiss();
    });
    
  }

  searchuser(searchbar) {
    this.filteredsub = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredsub = this.filteredsub.filter((v) => {
      if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  addCheckbox(event, checkbox : String) { 
    console.log(event.checked, checkbox);
    
    if ( event.checked ) {
      this.selectedArray.push(checkbox);
      console.log(this.selectedArray);
          let sentuser = this.temparr.indexOf(checkbox);
          this.temparr.splice(sentuser, 1);
    } else {
      let index = this.removeCheckedFromArray(checkbox);
      this.selectedArray.splice(index,1);
      console.log(this.selectedArray);
    }
  }

  removeCheckedFromArray(checkbox : String) {
    return this.selectedArray.findIndex((category)=>{
      return category === checkbox;
    })
  }

  selectInterests(data) {
    this.selectedArray.push(data);
    console.log(this.selectedArray);     
  }

  done() {
    
    this.selectedArray.forEach(ele => {
      this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).update({
        "interests": firebase.firestore.FieldValue.arrayUnion(ele)
      })  
    })
    this.rawt();
    
  }

  rawt() {
    this.afStore.collection('users').doc(firebase.auth().currentUser.uid).get().subscribe((documentSnapshot) => {  
      if(documentSnapshot.data().type == "Tutor"){
        this.navCtrl.push('AvailabilityPage');
      } else {
        this.navCtrl.setRoot('TabsPage');
      }
    })
  }

  goback(){
    this.navCtrl.pop();
  }

}
