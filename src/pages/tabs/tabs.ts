import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs-compat';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: string = "MainPage"
  tab12: string = "SearchPage" 
  tab2: string = "CalendarPage" 
  tab3: string = "ChatPage"
  tab4: string = "ProfilePage"
  learner: boolean = false;
  utype :  Observable<any>;
  typeRef : AngularFireObject<any>;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, 
    private afDatabase: AngularFireDatabase) {

      this.afAuth.authState.subscribe(auth => {
        this.typeRef = this.afDatabase.object('profile/'+ auth.uid)
        this.utype = this.typeRef.valueChanges();
        this.utype.subscribe(res => {
          if(res.type != 'Tutor'){
            this.learner = true;
            console.log('User is a learner! '+ res.type)
          }
          else{
            console.log('User is a tutor! '+ res.type)
          }
        })
      })

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    
  }

}
