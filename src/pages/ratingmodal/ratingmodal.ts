import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';


@IonicPage()
@Component({
  selector: 'page-ratingmodal',
  templateUrl: 'ratingmodal.html',
})
export class RatingmodalPage {

  @Input() rating: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  desc: string;
  params: string;
  utype :  Observable<any>;
  fname: string;
  lname: string;
  photoURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private afStore: AngularFirestore, public alertCtrl: AlertController) {
    this.params  = this.navParams.get('tutorid');
    this.loaduserdetails();
  }

  loaduserdetails() {

      this.utype = this.afStore.collection('user').doc(firebase.auth().currentUser.uid).valueChanges();
      this.utype.subscribe(res => {
        console.log(res.fname);
        this.fname = res.fname;        
        this.lname = res.lname;  
        
      })
    
  }

  dismiss() {
   
    this.viewCtrl.dismiss();
  }

  submitrating(){
    this.afStore
    .collection("ratings")
    .doc(firebase.auth().currentUser.uid+"_"+this.params)
    .set({
      'desc': this.desc,
      'rating': this.rating,
      'learner': firebase.auth().currentUser.uid,
      'learnerfname': this.fname,
      'tutor': this.params
    }).then(()=> {
      const alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: "Rating submitted",
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop()
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingmodalPage');
  }

  rate(index: number) {
    // function used to change the value of our rating 
    // triggered when user, clicks a star to change the rating
    console.log(index);
    this.rating = index;
    this.ratingChange.emit(this.rating);
 }



getColor(index: number) {

  enum COLORS {
    GREY = "#E0E0E0",
    GREEN = "#76FF03",
    YELLOW = "#FFCA28",
    RED = "#DD2C00"
  }

  if(this.isAboveRating(index)) {
    return COLORS.GREY;
  }
  switch (this.rating) {
    case 1: 
    case 2: return COLORS.RED;
    case 3: return COLORS.YELLOW;
    case 4: 
    case 5: return COLORS.GREEN;
    default: return COLORS.GREY;

  }
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:
  
          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green 
    */
  }

isAboveRating(index: number): boolean {
  // returns whether or not the selected index is above ,the current rating
  // function is called from the getColor function.
  return index > this.rating;
}

}
