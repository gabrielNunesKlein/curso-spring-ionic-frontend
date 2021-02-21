import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-singnup',
  templateUrl: 'singnup.html',
})
export class SingnupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  signupUser(){
    console.log('Enviou o form')
  }
}
