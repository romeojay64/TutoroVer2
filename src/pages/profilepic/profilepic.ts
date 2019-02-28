import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
// import { File } from '@ionic-native/file';
// import { FileChooser } from '@ionic-native/file-chooser';
// import { FilePath } from '@ionic-native/file-path';
// import * as firebase from 'firebase/app';
import 'firebase/storage';
// import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
  
})

export class ProfilepicPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
    public zone: NgZone, public loadingCtrl: LoadingController, public userservice: UserProvider, 
    // private fileChooser: FileChooser,
    // private file: File, 
    // private filePath: FilePath, 
    // private camera: Camera
    ) {
  }

  ionViewDidLoad() {
  }

  // chooseimage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum: false
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     alert(base64Image);
  //    }, (err) => {
  //     // Handle error
  //    });
  // }


  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }

  // chooseimage() {
  //   this.fileChooser.open().then((uri) => {
  //     alert(uri);

  //     this.file.resolveLocalFilesystemUrl(uri).then((newUrl) =>{
  //       alert(JSON.stringify(newUrl));

  //       let dirPath = newUrl.nativeURL;
  //       let dirPathSegments = dirPath.split('/');
  //       dirPathSegments.pop();
  //       dirPath = dirPathSegments.join('/')

  //       this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer) => {
  //         await this.upload(buffer, newUrl.name);

  //       })

  //     })
  //   })
  // }

  // chooseimage2() {
  //   this.fileChooser.open().then(uri => {
  //     alert(uri);

  //     this.filePath.resolveNativePath(uri).then(filePath => {
  //       alert(filePath);
  //       let dirPathSegments = filePath.split('/');
  //       let fileName = dirPathSegments[dirPathSegments.length-1];
  //       dirPathSegments.pop();
  //       let dirPath = dirPathSegments.join('/');
  //       this.file.readAsArrayBuffer(dirPath, fileName).then(async (buffer) => {
  //         await this.upload(buffer, fileName);
  //       }).catch((err) => {
  //         alert(err.toString());
  //       });
  //     });
  //   });
  // }

  // async upload(buffer, name) {
  //   let blob = new Blob([buffer], {type: "images/jpeg"});
  //   let storage  = firebase .storage();
  //   storage.ref('images/' + name).put(blob).then((d) => {
  //     alert("Done");
  //   }).catch((error) => {
  //     alert(JSON.stringify(error))
  //   })
  // }

  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    })
    loader.present();
    this.userservice.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        alert(res);
      }
    })
  }
 
  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }

  

}
