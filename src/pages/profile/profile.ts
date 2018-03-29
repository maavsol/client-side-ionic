import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  email: String;
  password: String;
  userId: String;
  toastMessage: String[] = ['El usuario se ha editado correctamente', 'Has dejado campos vacios'];
  address: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  ionViewDidLoad() {
      this.user = this.auth.user;
      console.log(this.user)
    
  }

}
