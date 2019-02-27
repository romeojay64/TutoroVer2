import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs-compat';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-tutordetail',
  templateUrl: 'tutordetail.html',
})
export class TutordetailPage {
  profileData : Observable<any>
  subjectArray = []
  params: any
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  avatar: string;
  utype :  Observable<any>;
  tutor: boolean;

  public levels = [
    {'PreSchool' : false},
    {'Elementary':  false},
    {'HighSchool': false},
    {'JuniorHighSchool': false},
    {'SeniorHighSchool': false},
    {'CollegeUndergraduate': false},
    {'Adult': false},
  ];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
    public userservice: UserProvider, public zone: NgZone, private afStore: AngularFirestore) {
    this.params  = this.navParams.get('tutorid');
    this.profileData = this.afStore.collection('profile').doc(this.params).valueChanges();
    // this.profileData = this.afDatabase.object('profile/'+this.params).valueChanges();
    //     this.afDatabase.list('interests/'+this.params).valueChanges()
    //     .subscribe(datas => {
    //         console.log(datas);
            
    //         datas.forEach(sub => {
    //           this.subjectArray.push(sub);
    //         });

    //     }, (err) => {
    //       console.log(err);
    //     });
  }

  gettutordetails(tutor) {
  
   return this.afStore.collection('profile').doc(tutor).valueChanges();
   
    
  }

  messageTutor() {
    this.navCtrl.push('InitialmessagePage', {tutorid  : this.params});
  }

  ionViewWillEnter() {
    this.gettutordetails(this.params).subscribe((res: any) => {

              this.afStore.collection('profile').doc(this.params).get().subscribe((querySnapshot) => {
                console.log(querySnapshot.exists);
                
                // console.log(querySnapshot.data().teaches.CollegeUndergraduate);
                if(querySnapshot.exists) {
                  if(querySnapshot.data().teaches.PreSchool){
                    console.log('Preschool Exists!');
                    this.levels[0].PreSchool = true;
                  }
                  if(querySnapshot.data().teaches.Elementary){
                    console.log('Elementary Exists!');
                    this.levels[1].Elementary = true;
                  }
                  if(querySnapshot.data().teaches.HighSchool){
                    console.log('HighSchool Exists!');
                    this.levels[2].HighSchool = true;
                  }
                  if(querySnapshot.data().teaches.JuniorHighSchool){
                    console.log('JuniorHighSchool Exists!');
                    this.levels[3].JuniorHighSchool = true;
                  }
                  if(querySnapshot.data().teaches.SeniorHighSchool){
                    console.log('SeniorHighSchool Exists!');
                    this.levels[4].SeniorHighSchool = true;
                  }
                  if(querySnapshot.data().teaches.CollegeUndergraduate){
                    console.log('CollegeUndergraduate Exists!');
                    this.levels[5].CollegeUndergraduate = true;
                  }
                  if(querySnapshot.data().teaches.Adult){
                    console.log('Adult Exists!');
                    this.levels[6].Adult = true;
                  }
                }
                
              })
     
      if(!res.photoURL){
        this.avatar = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
      }else {
        this.zone.run(() => {
          this.avatar = res.photoURL;
        })
      }
      
    });

  }
  
   
     
    
    
    
 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutordetailPage');
  }

}
