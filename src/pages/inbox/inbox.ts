import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration
} from "@ionic-native/paypal";
import { Config } from "../../app/app.paypal.config";
import { ChatProvider } from "../../providers/chat/chat";
import { Events } from "ionic-angular";
import { Observable } from "rxjs-compat";

@IonicPage()
@Component({
  selector: "page-inbox",
  templateUrl: "inbox.html"
})
export class InboxPage {
  tutor: boolean;
  learnermessages: any;
  tutormessages: any;
  tutorapprovedmessages: any;
  learnerapprovedmessages: any;
  payPalEnvironment: string = "payPalEnvironmentSandbox";
  payment: PayPalPayment = new PayPalPayment(
    "2.00",
    "USD",
    "Tutoro Subscription",
    "subscription"
  );
  exists = true;
  approvedexists = true;
  counter: number;
  isPremium: any;
  ptype: Observable<any>;

  imgurl =
    "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afStore: AngularFirestore,
    public alertCtrl: AlertController,
    private payPal: PayPal,
    public chatservice: ChatProvider,
    public events: Events
  ) {
    this.afStore
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .subscribe(ref => {
        if (ref.data().type == "Tutor") {
          console.log("You are a tutor!");
          this.tutor = true;
          this.gettutormessages();
          this.gettutorapprovedrequests();
        } else {
          console.log("You are NOT a tutor!");
          this.tutor = false;
          this.getlearnermessages();
          this.getlearnerapprovedrequests();
        }
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InboxPage");
  }

  getlearnermessages() {
    this.afStore
      .collection("messages", ref =>
        ref
          .where("sender", "==", firebase.auth().currentUser.uid)
          .where("isAccepted", "==", false)
      )
      .valueChanges()
      .subscribe(ref => {
        if (ref.length > 0) {
          this.learnermessages = ref;
        } else {
          this.exists = false;
        }
      });
  }

  gettutormessages() {
    this.afStore
      .collection("messages", ref =>
        ref
          .where("reciever", "==", firebase.auth().currentUser.uid)
          .where("isAccepted", "==", false)
          .where("isArchived", "==", false)
      )
      .valueChanges()
      .subscribe(ref => {
        if (ref.length > 0) {
          this.tutormessages = ref;
        } else {
          this.exists = false;
        }

        console.log(this.tutormessages);
      });
  }

  gettutorapprovedrequests() {
    this.afStore
      .collection("messages", ref =>
        ref
          .where("reciever", "==", firebase.auth().currentUser.uid)
          .where("isAccepted", "==", true)
          .where("isBuddies", "==", false)
      )
      .valueChanges()
      .subscribe(ref => {
        if (ref.length > 0) {
          this.approvedexists = true;
          this.tutorapprovedmessages = ref;
        } else {
          this.approvedexists = false;
        }

        console.log(this.tutorapprovedmessages);
      });
  }

  getlearnerapprovedrequests() {
    this.afStore
      .collection("messages", ref =>
        ref
          .where("sender", "==", firebase.auth().currentUser.uid)
          .where("isAccepted", "==", true)
      )
      .valueChanges()
      .subscribe(ref => {
        if (ref.length > 0) {
          this.learnerapprovedmessages = ref;
        } else {
          this.approvedexists = false;
        }
        console.log(this.learnerapprovedmessages);
      });
  }

  goToDetailPage(tutor) {
    console.log(tutor);
    this.navCtrl.push("TutordetailPage", { tutorid: tutor });
  }

  openmessage(tutor: string, learner: string) {
    this.afStore
      .collection("messages")
      .doc(learner + "_" + tutor)
      .update({
        isRead: true
      });
    // this.events.publish('badgecount');
    this.navCtrl.push("MessagedetailsPage", {
      tutorid: tutor,
      learnerid: learner
    });
    console.log(tutor);
  }

  buddychat(buddy, buddypic) {
    this.chatservice.initializebuddy(buddy);
    // this.navCtrl.push('BuddychatPage', {buddypic: buddypic});
  }

  hiretutor(tutor, name, sender) {
    this.payPal
      .init({
        PayPalEnvironmentProduction: Config.payPalEnvironmentProduction,
        PayPalEnvironmentSandbox: Config.payPalEnvironmentSandbox
      })
      .then(
        () => {
          this.payPal
            .prepareToRender(
              this.payPalEnvironment,
              new PayPalConfiguration({})
            )
            .then(
              () => {
                this.payPal.renderSinglePaymentUI(this.payment).then(
                  response => {
                    alert(
                      "Successfully paid. Status = ${response.response.state}"
                    );
                    console.log(response);
                  },
                  () => {
                    console.error(
                      "Error or render dialog closed without being successful"
                    );
                  }
                );
              },
              () => {
                console.error("Error in configuration");
              }
            );
        },
        () => {
          console.error(
            "Error in initialization, maybe PayPal isn't supported or something else"
          );
        }
      );

    this.afStore
      .collection("chat")
      .doc(firebase.auth().currentUser.uid + "_" + tutor)
      .set({
        isBuddies: true
      })
      .then(() => {
        this.afStore
          .collection("messages")
          .doc(sender + "_" + tutor)
          .update({
            isBuddies: true
          });

        this.ptype = this.afStore
          .collection("profile")
          .doc(tutor)
          .get();
        this.ptype.subscribe(res => {
          console.log("buddycounter: " + res.data().buddycounter);
          this.counter = res.data().buddycounter;
          this.isPremium = res.data().isPremium;

          console.log("Counter: " + this.counter);

          this.afStore
            .collection("profile")
            .doc(tutor)
            .update({
              buddycounter: res.data().buddycounter + 1
            });

          if (!this.isPremium) {
            if (res.data().buddycounter > 1) {
              this.afStore
                .collection("profile")
                .doc(tutor)
                .update({
                  include: false
                });
            }
          }
        });

        let statusalert = this.alertCtrl.create({
          buttons: ["okay"]
        });
        statusalert.setTitle("Success!");
        statusalert.setSubTitle("You now have the contact detials of " + name);
        statusalert.present();
      });
  }
}
