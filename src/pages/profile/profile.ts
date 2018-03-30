import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  password: String;
  userId: String;
  toastMessage: String[] = ['El usuario se ha editado correctamente', 'Has dejado campos vacios'];
  address: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public userServ: UserProvider, public alert: AlertController, public toast: ToastController) {
  }

  ionViewDidLoad() {
      this.user = this.auth.user;
      this.userId = this.user._id
      console.log(this.user)
  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'X'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  presentPrompt(message, field, type) {
    console.log('entro aca hueva')
    let alert = this.alert.create({
      title: 'Editar',
      message: message,
      inputs: [
        {
          name: field,
          placeholder: field,
          type: type
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            if (data) {
              this.userServ.updateUser(data, this.userId).subscribe((newInfo: any) => 
                {this.user.username = newInfo.username
                this.presentToast('usuario actualizado correctamente')}
              )
            } 
          }
        }
      ]
    });
    alert.present();
  }

  changeUsername(){
    this.presentPrompt('Introduce tu nuevo email', 'email', 'email')
  }

  changePassword(){
    this.presentPrompt('Introduce tu nueva contraseña', 'contrasena', 'password')
  }

}
