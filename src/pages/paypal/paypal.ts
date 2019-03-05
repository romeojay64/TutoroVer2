import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Config } from '../../app/app.paypal.config';


@IonicPage()
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {

  payPalEnvironment: string = 'payPalEnvironmentSandbox';
	payment: PayPalPayment = new PayPalPayment('2.00', 'USD', 'Tutoro Subscription', 'subscription');

 

  constructor(public navCtrl: NavController, public navParams: NavParams, private payPal: PayPal) {
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
					alert('Successfully paid. Status = ${response.response.state}');
					console.log(response);
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
