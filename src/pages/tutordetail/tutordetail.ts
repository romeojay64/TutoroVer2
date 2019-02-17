import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs-compat';
import { AngularFireDatabase } from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-tutordetail',
  templateUrl: 'tutordetail.html',
})
export class TutordetailPage implements OnInit {
  profileData : Observable<any>
  subjectArray = []
  params: any
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {
    this.params  = this.navParams.get('tutorid');
    this.profileData = this.afDatabase.object('profile/'+this.params).valueChanges();
        this.afDatabase.list('interests/'+this.params).valueChanges()
        .subscribe(datas => {
            console.log(datas);
            
            datas.forEach(sub => {
              this.subjectArray.push(sub);
            });

        }, (err) => {
          console.log(err);
        });
  }

  ngOnInit() {
        
    
     
    }
  
    
    
 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutordetailPage');
  }

}
