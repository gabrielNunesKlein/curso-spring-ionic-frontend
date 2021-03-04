import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.services';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO
  picture: string
  profileImage
  cameraOn: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService,
      public clienteService: ClienteService, private camera: Camera, public sanitizer: DomSanitizer) {

        this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData(){
    let localUser = this.storage.getLocalUser()
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(Response =>{
        this.cliente = Response as ClienteDTO;
        this.getImageIfExist()
      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage')
        }
      })
    }
    else{
      this.navCtrl.setRoot('HomePage')
    }
  }

  getImageIfExist(){
    this.clienteService.getImageFromBuket(this.cliente.id).subscribe(Response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
      this.blobToDataURL(Response).then(dataUrl =>{
        let str : string = dataUrl as string
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
      })
    },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    })
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }

  getCameraPicture(){
    this.cameraOn = true
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/PNG;base64,' + imageData;
     this.cameraOn = false
    }, (err) => {
      this.cameraOn = false
    });
  }

  getGaleryPicture(){
    this.cameraOn = true
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/PNG;base64,' + imageData;
     this.cameraOn = false
    }, (err) => {
      this.cameraOn = false
    });
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture).subscribe(Response => {
      this.picture = null
      this.getImageIfExist()
    }, error => { })
  }

  cancel(){
    this.picture = null
  }
}
