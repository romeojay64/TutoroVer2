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
import { Profile } from '../../models/profile';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  avatar: string;


  profileData = {} as Profile
  subjects : Observable<Interest>
  subjectArray = []
  teaches = []
  showlevels = []
  teachesCollege: boolean
  tutor: boolean
  utype :  Observable<any>;

  public levels = [
    {'PreSchool' : false},
    {'Elementary':  false},
    {'HighSchool': false},
    {'JuniorHighSchool': false},
    {'SeniorHighSchool': false},
    {'CollegeUndergraduate': false},
    {'Adult': false},
  ];

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
      this.utype = this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).valueChanges();
      this.utype.subscribe(res => {
            if(res.type == 'Tutor'){
              this.tutor = true;
              this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe((querySnapshot) => {
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
             
            }
      })
      
      
      
      if(!res.photoURL){
        this.avatar = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
      }else {
        this.zone.run(() => {
          this.avatar = res.photoURL;
        })
      }
    
     
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
