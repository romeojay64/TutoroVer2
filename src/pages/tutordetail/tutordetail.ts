import { Component, NgZone, EventEmitter, Output, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { Observable } from 'rxjs-compat';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Rating } from '../../models/rating';

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
  flex: boolean;
  buddies: boolean = false;
  allratings: Observable<any>;
  alleachratings = [] as Rating;
  rating: any;
  verified: boolean;


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
photo: string;
accumulaterating: number = 0;
counter: number = 0;
avgrating: number;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
    public userservice: UserProvider, public zone: NgZone, private afStore: AngularFirestore,
    public modalCtrl: ModalController) {
    this.params  = this.navParams.get('tutorid');
    this.getratings();
    
    this.profileData = this.afStore.collection('profile').doc(this.params).valueChanges();
   this.profileData.subscribe(ref => {
     this.flex = ref.isFlexible;
     if(ref.photoURL){
      this.photo = ref.photoURL;
     } else {
      this.photo = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
     }
     
   })

   this.afStore.collection('messages').doc(firebase.auth().currentUser.uid+"_"+this.params).get().subscribe((querySnapshot) => {
    if(querySnapshot.exists){
      if(querySnapshot.data().isBuddies == true){
        this.buddies = true;
      } else {
        this.buddies = false;
      }
    }
    
   })

   this.afStore.collection('users').doc(this.params).get().subscribe((querySnapshot) => {
    if(querySnapshot.exists){
      if(querySnapshot.data().isVerified == true){
        this.verified = true;
      } else {
        this.verified = false;
      }
    }
    
   })
   
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

  gotochat(){
    this.navCtrl.push('BuddychatPage', {buddypic: this.photo});
  }

ratingmodal() {
  const modal = this.modalCtrl.create('RatingmodalPage', {tutorid: this.params});
  modal.present();
}

getratings(){
  this.allratings = this.afStore
  .collection("ratings", ref => ref.where("tutor", "==", this.params))
  .valueChanges()
  this.allratings.subscribe(items => {
    // console.log(items);
    // items.forEach(element => {
    //   let rate
    //   rate = element.rating;
    //   this.counter++;
    //   this.accumulaterating = this.accumulaterating + rate;
    //   console.log(this.counter, this.accumulaterating);
    //   this.avgrating = this.accumulaterating/this.counter;
    // });
    
      this.alleachratings = items;
      
  });
}

getColor(index: number) {

  enum COLORS {
    GREY = "#E0E0E0",
    GREEN = "#76FF03",
    YELLOW = "#FFCA28",
    RED = "#DD2C00"
  }

  
    return COLORS.YELLOW;
  
  }





  gettutordetails(tutor) {
  
   return this.afStore.collection('profile').doc(tutor).valueChanges();
   
    
  }

  messageTutor() {
    this.navCtrl.push('InitialmessagePage', {tutorid  : this.params});
  }

  getteaches() {
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
  }

  getavail(){
    this.afStore.collection('profile').doc(this.params).get().subscribe((querySnapshot) => {
      console.log(querySnapshot.exists);
      if(querySnapshot.exists) {
        if(querySnapshot.data().days.Monday){
          
          this.adlaw[0].Monday = true;
        }
        if(querySnapshot.data().days.Tuesday){
          
          this.adlaw[1].Tuesday = true;
        }
        if(querySnapshot.data().days.Wednesday){
         
          this.adlaw[2].Wednesday = true;
        }
        if(querySnapshot.data().days.Thursday){
          
          this.adlaw[3].Thursday = true;
        }
        if(querySnapshot.data().days.Friday){
          
          this.adlaw[4].Friday = true;
        }
        if(querySnapshot.data().days.Saturday){
          
          this.adlaw[5].Saturday = true;
        }
        if(querySnapshot.data().days.Sunday){
          
          this.adlaw[6].Sunday = true;
        }
      }
      
    })
  }


  ionViewWillEnter() {
    this.gettutordetails(this.params).subscribe((res: any) => {
       
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
    this.getteaches();
    this.getavail();
    console.log('ionViewDidLoad TutordetailPage');
  }

}
