import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as Lodash from 'lodash'; 
// import { Profile } from '../../models/profile';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

   

  userArray: Observable<any[]>
  subjectArray= []
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
 
  
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {

       this.userArray = this.afDatabase.list('profile', ref => ref.orderByChild('type').equalTo('Tutor'))
      .snapshotChanges()
      .pipe(map(items => {             // <== new way of chaining
        return items.map(a => {
          
          const data = a.payload.val();
          const key = a.payload.key;
          
          
          
          
          return {key, ...data};  
                   // or {key, ...data} in case data is Obj
        });
      }));

      //  this.afDatabase.list('profile', ref => ref.orderByChild('type').equalTo('Tutor'))
      // .snapshotChanges()
      // .subscribe(res => {
      //   this.userArray = res;
      //   console.log(this.userArray);
      // })

      

    
      
  }

  goToDetailPage(tutor) {
    console.log(tutor);
    this.navCtrl.push('TutordetailPage', {tutorid  : tutor});
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    
    
     
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
