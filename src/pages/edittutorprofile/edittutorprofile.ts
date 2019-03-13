import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Profile } from '../../models/profile';
import { Observable } from 'rxjs-compat';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';


@IonicPage()
@Component({
  selector: 'page-edittutorprofile',
  templateUrl: 'edittutorprofile.html',
})
export class EdittutorprofilePage {

  profile = {} as Profile;
  selectedArray: any = [];
  public savedlevels = [
    {'PreSchool' : false},
    {'Elementary':  false},
    {'HighSchool': false},
    {'JuniorHighSchool': false},
    {'SeniorHighSchool': false},
    {'CollegeUndergraduate': false},
    {'Adult': false},
  ];
  public levels = [
    { label: "Pre-School", val: "PreSchool" },
    { label: "Elementary", val: "Elementary" },
    { label: "High School", val: "HighSchool" },
    { label: "Junior High School", val: "JuniorHighSchool" },
    { label: "Senior High School", val: "SeniorHighSchool" },
    { label: "College Undergraduate", val: "CollegeUndergraduate" },
    { label: "Adult", val: "Adult" }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private afStore: AngularFirestore, public userservice: UserProvider) {

    this.userservice.getuserdetails().subscribe((res: any) => {
      this.profile = res;
      
    })

    this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe((querySnapshot) => {
      if(querySnapshot.exists) {
        if(querySnapshot.data().teaches.PreSchool){
          console.log('Preschool Exists!');
          this.savedlevels[0].PreSchool = true;
        }
        if(querySnapshot.data().teaches.Elementary){
          console.log('Elementary Exists!');
          this.savedlevels[1].Elementary = true;
        }
        if(querySnapshot.data().teaches.HighSchool){
          console.log('HighSchool Exists!');
          this.savedlevels[2].HighSchool = true;
        }
        if(querySnapshot.data().teaches.JuniorHighSchool){
          console.log('JuniorHighSchool Exists!');
          this.savedlevels[3].JuniorHighSchool = true;
        }
        if(querySnapshot.data().teaches.SeniorHighSchool){
          console.log('SeniorHighSchool Exists!');
          this.savedlevels[4].SeniorHighSchool = true;
        }
        if(querySnapshot.data().teaches.CollegeUndergraduate){
          console.log('CollegeUndergraduate Exists!');
          this.savedlevels[5].CollegeUndergraduate = true;
        }
        if(querySnapshot.data().teaches.Adult){
          console.log('Adult Exists!');
          this.savedlevels[6].Adult = true;
        }
      }
    })
  }

  ionViewDidLoad() {
  
  }

  addCheckbox(event, checkbox: string) { 
    console.log(event.checked, checkbox);
    
    if ( event.checked ) {
      this.selectedArray.push(checkbox);
      console.log(this.selectedArray);
          // let chosenday = this.days.indexOf(checkbox);
          // this.days.splice(chosenday, 1);
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

  done() {

    this.afStore
        .collection("profile")
        .doc(firebase.auth().currentUser.uid)
        .update({
          "teaches": firebase.firestore.FieldValue.delete()
        }).then(()=> {
          this.selectedArray.forEach(ele => {

            this.afStore
              .collection("profile")
              .doc(firebase.auth().currentUser.uid)
              .update({
                ["teaches." + ele]: true
              });
              this.navCtrl.setRoot("ProfilePage");
          });
        });
    
  }


}
