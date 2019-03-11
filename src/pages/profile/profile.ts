import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, App, ToastController } from 'ionic-angular';
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
  fname: string;
  lname: string;
  verified: boolean;
  hiredtutors: any;
  parent: boolean;

  public levels = [
    {'PreSchool' : false},
    {'Elementary':  false},
    {'HighSchool': false},
    {'JuniorHighSchool': false},
    {'SeniorHighSchool': false},
    {'CollegeUndergraduate': false},
    {'Adult': false},
  ];
  public adlaw = [
    {'Monday' : false},
    {'Tuesday':  false},
    {'Wednesday': false},
    {'Thursday': false},
    {'Friday': false},
    {'Saturday': false},
    {'Sunday': false},
  ];
  flex: boolean;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
  public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider, public loadingCtrl: LoadingController,
    private afStore: AngularFirestore,  private app: App, public toastCtrl: ToastController){
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  edittutorprofile(){
    this.navCtrl.push("InterestsPage");
  }

  loaduserdetails() {
    this.userservice.getuserdetails().subscribe((res: any) => {
      this.profileData = res;
      this.utype = this.afStore.collection('users').doc(firebase.auth().currentUser.uid).valueChanges();
      this.utype.subscribe(res => {
        this.fname = res.fname;        
        this.lname = res.lname;        
        
            if(res.type == 'Tutor'){
              this.tutor = true;
              this.verified = res.isVerified;
              this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe((querySnapshot) => {
                console.log(querySnapshot.exists);
                this.flex = querySnapshot.data().isFlexible;
                
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

             

              
             
            } else if (res.type == 'Parent') {
              this.parent = true;
            }else {
              console.log("Learner");
              this.afStore.collection('messages', ref =>
              ref.where("sender", "==", firebase.auth().currentUser.uid).where("isAccepted", "==", true).where("isBuddies", "==", true).orderBy('timehiredtutor', "desc")).valueChanges().subscribe(ref => {
                
                this.hiredtutors = ref;
                console.log(this.hiredtutors);
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

  gototutorcontact(tutor){
    this.navCtrl.push("TutorcontactPage", {tutorid: tutor});
  }

  editprofile(){
    this.navCtrl.push("EditprofilePage");
  }

  getavail(){
    this.afStore.collection('profile').doc(firebase.auth().currentUser.uid).get().subscribe((querySnapshot) => {
      console.log(querySnapshot.exists);
      if(querySnapshot.exists) {
        if(querySnapshot.data().days.Monday){

          console.log("Monday true");
          this.adlaw[0].Monday = true;
        }
        if(querySnapshot.data().days.Tuesday){
          console.log("Tuesday true");
          this.adlaw[1].Tuesday = true;
        }
        if(querySnapshot.data().days.Wednesday){
          console.log("Wednesday true");
          this.adlaw[2].Wednesday = true;
        }
        if(querySnapshot.data().days.Thursday){
          console.log("Thursday true");
          this.adlaw[3].Thursday = true;
        }
        if(querySnapshot.data().days.Friday){
          console.log("Friday true");
          this.adlaw[4].Friday = true;
        }
        if(querySnapshot.data().days.Saturday){
          console.log("Saturday true");
          this.adlaw[5].Saturday = true;
        }
        if(querySnapshot.data().days.Sunday){
          console.log("Sunday true");
          this.adlaw[6].Sunday = true;
        }
      }
      
    })
  }

  logout() {
    
    this.afAuth.auth.signOut();
   
    // this.navCtrl.setRoot('LoginPage');
    this.app.getRootNav().setRoot('LoginPage');
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
          this.zone.run(() => {
            this.avatar = url;
          })  
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          
        }  
      }).catch((err) => {
        statusalert.setTitle('Failed');
        statusalert.setSubTitle('Your profile pic was not changed');
        statusalert.present();
      })
    })
    
  }

  check(){
    if(this.tutor && this.adlaw[0].Monday){
      return true
    }
    if(this.tutor && this.adlaw[1].Tuesday){
      return true
    }
    if(this.tutor && this.adlaw[2].Wednesday){
      return true
    }
    if(this.tutor && this.adlaw[3].Thursday){
      return true
    }
    if(this.tutor && this.adlaw[4].Friday){
      return true
    }
    if(this.tutor && this.adlaw[5].Saturday){
      return true
    }
    if(this.tutor && this.adlaw[6].Sunday){
      return true
    }
  }

  verify(){

    if(this.verified && this.tutor){
      return true
    }
    else {
      return false
    }

  }

  viewtutors(){

  }

  ionViewDidLoad() {
    this.getavail();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if(!user.emailVerified){
          let toast = this.toastCtrl.create({
            message: 'Check your email to verify your account',
            // duration: 3000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "Okay"
          });
    
          toast.present();
        }
      }
    })
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
