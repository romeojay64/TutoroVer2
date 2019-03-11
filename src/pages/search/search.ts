import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, Keyboard, AlertController, LoadingController } from "ionic-angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
// import * as Lodash from 'lodash';
// import { Profile } from '../../models/profile';
import { Observable } from "rxjs-compat";
import { map } from "rxjs/operators";
import * as firebase from "firebase/app";
import { UserProvider } from "../../providers/user/user";
import { AngularFirestore } from "@angular/fire/firestore";

import { Profile } from "../../models/profile";
import { Filter } from "../../models/filter";
import { t } from "@angular/core/src/render3";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage implements OnInit {

  private list: string[] = [ 'Accounting',
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
'UKCAT'];
  public input: string = '';
  public countries: string[] = [];

  userArray: Observable<any[]>;
  public cities = [
    {name: 'Cebu City'},
  ];



  public brgys = [
    {name: 'Adlaon'},
    {name: 'Agsungot'},
    {name: 'Apas'},
    {name: 'Babag'},
    {name: 'Basak pardo'},
    {name: 'Bacayan'},
    {name: 'Banilad'},
    {name: 'Basak San Nicolas'},
    {name: 'Banilaw'},
    {name: 'Bonbon'},
    {name: 'Budla-an (Pob.)'},
    {name: 'Buhisan'},
    {name: 'Bulacao'},
    {name: 'Buot-Taup Pardo'},
    {name: 'Busay (Pob.)'},
    {name: 'Calamba'},
    {name: 'Cambinocot'},
    {name: 'Capitol Site (Pob.)'},
    {name: 'Carreta'},
    {name: 'Central (Pob.)'},
    {name: 'Cogon Ramos (Pob.)'},
    {name: 'Cogon Pardo'},
    {name: 'Day-as'},
    {name: 'Duljo (Pob.)'},
    {name: 'Ermita (Pob.)'},
    {name: 'Guadalupe'},
    {name: 'Guba'},
    {name: 'Hippodromo'},
    {name: 'Kalubihan (Pob.)'},
    {name: 'Kalunasan'},
    {name: 'Kamagayan (Pob.)'},
    {name: 'Camputhaw (Pob.)'},
    {name: 'Kasambagan'},
    {name: 'Kinasang-an Pardo'},
    {name: 'Labangon'},
    {name: 'Lahug (Pob.)'},
    {name: 'Lorega (Lorega San Miguel)'},
    {name: 'Luz'},
    {name: 'Mabolo'},
    {name: 'Malubog'},
    {name: 'Pahina Central (Pob.)'},
    {name: 'Pahina San Nicolas'},
    {name: 'Pardo (Pob.)'},
    {name: 'Pari-an'},
    {name: 'Paril'},
    {name: 'Pasil'},
    {name: 'Pit-os'},
    {name: 'Pulangbato'},
    {name: 'Pung-ol-Sibugay'},
    {name: 'Punta Princesa'},
    {name: 'Quiot Pardo'},
    {name: 'Sambag I (Pob.)'},
    {name: 'Sambag II (Pob.)'},
    {name: 'San Antonio (Pob.)'},
    {name: 'San Jose'},
    {name: 'San Nicolas Central'},
    {name: 'San Roque (Ciudad)'},
    {name: 'Santa Cruz (Pob.)'},
    {name: 'Sawang Calero (Pob.)'},
    {name: 'Sinsin'},
    {name: 'Sirao'},
    {name: 'Suba Pob. (Suba San Nicolas)'},
    {name: 'Sudlon I'},
    {name: 'Sapangdaku'},
    {name: 'T. Padilla'},
    {name: 'Tabunan'},
    {name: 'Tagbao'},
    {name: 'Talamban'},
    {name: 'Taptap'},
    {name: 'Tejero (Villa Gonzalo)'},
    {name: 'Tinago'},
    {name: 'Tisa'},
    {name: 'To-ong Pardo'},
    {name: 'Zapatera'},
    {name: 'Sudlon II'},
];
  // userArray = [];
  db = firebase.firestore();
  userinterestsArray: Observable<any[]>;
  // userinterestsArray=[]
  avatar: string;
  subjectArray = [];
  temparr = [];
  filteredusers = [];
  filteredtutors = [];
  filter = {} as Filter;
  searchstring: string;
  exists = true;
  
  imgurl =
    "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e";
  tutors: Profile[];
  tutorlist: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private userservice: UserProvider,
    private afStore: AngularFirestore,
    private keyboard: Keyboard,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.userservice.besttutors().subscribe(items => {
     
      this.filteredtutors = items;
    });
    
    
    
    // this.userservice.getTutors().subscribe(items => {
    //   this.tutors = items;
      
    //   this.filteredtutors = this.tutors;
  
    // });
    //  afStore.collection('profile', ref => ref.where('type','==', 'Tutor')).get().subscribe(function(querySnapshot) {
    //   querySnapshot.docs.forEach(doc => {
    //     console.log(doc.data());
    //     this.tutors.push(doc.data());
    //   });
    // this.userArray = querySnapshot.docs.map(function (documentSnapshot) {
    //   return documentSnapshot.data();
    // })
    // querySnapshot.forEach(element => {
    //   this.userArray = element.data();
    //   console.log(element.data());
    //   console.log(this.userArray);
    // });
    // });
    //   this.userservice.getallusers().then((res: any) => {
    //     this.filteredusers = res;
    //     this.temparr = res;
    //  })
    //    this.userArray = this.afDatabase.list('profile', ref => ref.orderByChild('type').equalTo('Tutor'))
    //   .snapshotChanges()
    //   .pipe(map(items => {             // <== new way of chaining
    //     return items.map(a => {
    //       const data = a.payload.val();
    //       const key = a.payload.key;
    //       return {key, ...data};
    //                // or {key, ...data} in case data is Obj
    //     });
    //   }));
    //  this.afDatabase.list('profile', ref => ref.orderByChild('type').equalTo('Tutor'))
    // .snapshotChanges()
    // .subscribe(res => {
    //   this.userArray = res;
    //   console.log(this.userArray);
    // })
    
  }

  add(item: string) {
    this.input = item;
    this.countries = [];
  }

  removeFocus() {
    this.keyboard.close();
  }

  search() {
    if(this.input != null){
      if (!this.input.trim().length || !this.keyboard.isOpen()) {
        this.countries = [];
        return;
      }

      this.countries = this.list.filter(item => item.toUpperCase().includes(this.input.toUpperCase()));
    }
  
   
  }

  ngOnInit() {
    // this.userservice.getTutors().subscribe(items => {
    //   this.tutors = items;
    //   this.filteredtutors = this.tutors;
    //   console.log(this.tutors);
    // });
  }

  searchuser(searchbar) {
    console.log(searchbar);
    this.filteredtutors = this.tutors;
    
    var q = searchbar.target.value;
    console.log(q);
    if (q.trim() == '') {
      return;
    }

    this.filteredtutors = this.filteredtutors.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  reset() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    console.log("RESET!");
    this.filter.level = undefined;
    this.input = '';
    this.exists = true;
    this.filter.brgy = undefined;
    loader.dismiss();
    // this.userservice.resetTutors().subscribe(items => {
      this.userservice.besttutors().subscribe(items => {
     
        this.filteredtutors = items;
      });
    // });
  }
  filtertutors() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    
    console.log(this.filter.level);
    console.log(this.input);
    console.log(this.filter.brgy);
    if(this.input != ''){
      console.log("Nisud Dre");
      loader.present();
      if (this.filter.brgy && this.input != null) {
        this.userservice
          .getFilteredtutorsbrgy(this.filter.brgy,this.input)
          .subscribe(items => {
            if(items.length > 0) {
              console.log(items);
              loader.dismiss();
              this.filteredtutors = items;
              
            } else {
              console.log("WALEY");
              loader.dismiss();
              this.exists = false;
            }
            
          });
      }

      else if (this.filter.level && this.input != null){
        this.userservice
          .getFilteredtutorsbyLevel(this.filter.level,this.input)
          .subscribe(items => {
            if(items.length > 0) {
              console.log(items);
              loader.dismiss();
              this.filteredtutors = items;
              
            } else {
              console.log("WALEY");
              loader.dismiss();
              this.exists = false;
            }
          });
      }
      else if (this.filter.level && this.input != null && this.filter.brgy) {
        this.userservice
          .getFilteredtutorsbyBoth(this.filter.level,this.filter.brgy,this.input)
          .subscribe(items => {
            if(items.length > 0) {
              console.log(items);
              loader.dismiss();
              this.filteredtutors = items;
              
            } else {
              console.log("WALEY");
              loader.dismiss();
              this.exists = false;
            }
          });
      }
    } else {

      const alert = this.alertCtrl.create({
        title: 'Oh no!',
        subTitle: "There are no items to filter",
        buttons: ['OK']
      });
      alert.present();
    }
    
    // if (this.filter.subj && this.filter.level) {
    //   this.userservice
    //     .getFilteredtutorsbyBoth(this.filter.subj, this.filter.level)
    //     .subscribe(items => {
    //       this.filteredtutors = items;
    //     });
    // } else if (this.filter.subj) {
    //   this.userservice
    //     .getFilteredtutorsbySubj(this.filter.subj)
    //     .subscribe(items => {
    //       this.filteredtutors = items;
    //     });
    // } else {
    //   this.userservice
    //     .getFilteredtutorsbyLevel(this.filter.level)
    //     .subscribe(items => {
    //       this.filteredtutors = items;
    //     });
    // }
  }
  searchtutors(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.exists = true;
    console.log(this.input);
    if(this.input != null){
      this.userservice.search(this.input).subscribe(items => {
        if(items.length > 0) {
          console.log(items);
          loader.dismiss();
          this.filteredtutors = items;
          
        } else {
          console.log("WALEY");
          loader.dismiss();
          this.exists = false;
        }
        
      });
    }
    
  }

  goToDetailPage(tutor) {
    console.log(tutor);
    this.navCtrl.push("TutordetailPage", { tutorid: tutor });
    
  }

  messageTutor(tutor) {
    this.navCtrl.push("InitialmessagePage", { tutorid: tutor, topic: this.input});
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchPage");
  }

 
}
