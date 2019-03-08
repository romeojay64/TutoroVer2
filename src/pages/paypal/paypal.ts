import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Config } from '../../app/app.paypal.config';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {

  payPalEnvironment: string = 'payPalEnvironmentSandbox';
	payment: PayPalPayment = new PayPalPayment('2.00', 'USD', 'Tutoro Subscription', 'subscription');

 

  constructor(public alertCtrl: AlertController, private afStore: AngularFirestore, public navCtrl: NavController, public navParams: NavParams, private payPal: PayPal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypalPage');
	}

	proceed() {
    this.navCtrl.setRoot('ValididPage');
  }
	
	

  makePayment() {
		this.payPal.init({
      PayPalEnvironmentProduction: Config.payPalEnvironmentProduction,
			PayPalEnvironmentSandbox: Config.payPalEnvironmentSandbox
		}).then(() => {
			this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
					// alert('Successfully paid. Status = ${response.response.state}');
					const alert = this.alertCtrl.create({
						title: 'Success!',
						subTitle: "You are now Premium.",
						buttons: ['OK']
					});
					alert.present();
					// console.log(response);
					this.afStore
      .collection("profile")
      .doc(firebase.auth().currentUser.uid)
      .update({
        'isPremium': true
      })
					this.navCtrl.setRoot('ValididPage');
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, () => {
			console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
		});
	}

}
