import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
// import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
// import AuthProvider = firebase.auth.AuthProvider;
import {AuthProvider} from '@firebase/auth-types';
import {AuthCredential} from '@firebase/auth-types';


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
    public afAuth: AngularFireAuth, private afStore: AngularFirestore,
    public loadingCtrl: LoadingController,  public alertCtrl: AlertController) {

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
   
  }

  async login(user: User) {
    let loader = this.loadingCtrl.create({
      content: 'Logging in...'
    })
    loader.present();
    try {
        this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
          .then(tawo => {
            
            this.afStore.collection('profile').doc(tawo.user.uid).get().subscribe((querySnapshot) => {
              loader.dismiss();
              // if(querySnapshot.exists){
              //   this.navCtrl.setRoot('TabsPage');
              // } else {
              //   this.navCtrl.setRoot('RegisterprofilePage');
              // }
              if(querySnapshot.data().firstlogin == true){
                this.navCtrl.setRoot('RegisterprofilePage');
              } else {
                console.log(querySnapshot.data().uid);
                if(querySnapshot.data().uid == "LhrBACDxh0Zf4mpxmpg5KVz6aHI2"){
                  this.navCtrl.setRoot('AdminPage');
                } else {
                  this.navCtrl.setRoot('TabsPage');
                }
                
              }
            })
          
          }).catch(e => {
            loader.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Oh no!',
              subTitle: e.message,
              buttons: ['OK']
            });
            alert.present();
          });
    
        }
        catch(e){
            loader.dismiss();
            console.error(e);
          }
  }

  // async login(user: User) {
  //   try {
  //   this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  //     .then(tawo => {
  //       if(tawo.user.uid){
  //         this.afDatabase.object('/profile/' + tawo.user.uid).valueChanges().subscribe(res => {
  //           console.log(res)
  //           if(res == null) {
  //             this.navCtrl.setRoot('RegisterprofilePage');
  //           }
  //           else{
  //                 this.navCtrl.setRoot('TabsPage');
  //               }
  //       });    
  //       } 
      
  //     });

  //   }
  //   catch(e){
  //       console.error(e);
  //     }
  //   // try {
  //   //   const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      
  //   //   if(result){

  //   //     this.afAuth.authState.subscribe(user => {
  //   //       this.profileRef = this.afDatabase.object('/profile/' + user.uid)
  //   //       this.resUser = this.profileRef.valueChanges();
  //   //       this.resUser.subscribe(res=> {
  //   //         console.log(res)
  //   //         if(res == null) {
  //   //           this.navCtrl.setRoot('RegisterprofilePage');
  //   //         }
  //   //         else{
  //   //             this.navCtrl.setRoot('HomePage');    
  //   //         }
  //   //       });
          
  //   //     })

        

  //   //     // this.navCtrl.setRoot('RegisterprofilePage');
  //   //   }
  //   // }
  //   // catch(e){
  //   //   console.error(e);
  //   // }
  // }

  register() {
    this.navCtrl.push('RegisterPage');
  }




}
