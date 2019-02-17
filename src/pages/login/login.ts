import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs-compat';
// import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  resUser : Observable<any>;
  profileRef : AngularFireObject<any>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
   
  }

  async login(user: User) {
    try {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(tawo => {
        if(tawo.user.uid){
          this.afDatabase.object('/profile/' + tawo.user.uid).valueChanges().subscribe(res => {
            console.log(res)
            if(res == null) {
              this.navCtrl.setRoot('RegisterprofilePage');
            }
            else{
                  this.navCtrl.setRoot('TabsPage');
                }
        });    
        } 
      
      });

    }
    catch(e){
        console.error(e);
      }
    // try {
    //   const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      
    //   if(result){

    //     this.afAuth.authState.subscribe(user => {
    //       this.profileRef = this.afDatabase.object('/profile/' + user.uid)
    //       this.resUser = this.profileRef.valueChanges();
    //       this.resUser.subscribe(res=> {
    //         console.log(res)
    //         if(res == null) {
    //           this.navCtrl.setRoot('RegisterprofilePage');
    //         }
    //         else{
    //             this.navCtrl.setRoot('HomePage');    
    //         }
    //       });
          
    //     })

        

    //     // this.navCtrl.setRoot('RegisterprofilePage');
    //   }
    // }
    // catch(e){
    //   console.error(e);
    // }
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

}
