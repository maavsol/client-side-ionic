import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  error:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  login(){
    this.auth.login(this.username, this.password)
    .catch(e => this.error = e)
    .subscribe(() => {
      this.navCtrl.setRoot('PizzaMenuPage')
    })
  }

}
