import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider,     public alert: AlertController,
    public loading: LoadingController) {
  }

  login(){
    this.auth.login(this.username, this.password)
    .catch(e => this.error = e)
    .subscribe(() => {
      this.navCtrl.setRoot('PizzaMenuPage')
    })
  }


  navToRecoverPassword() {
    let alert = this.alert.create({
      title: "Restablecer Contraseña",
      inputs: [
        {
          name: "email",
          placeholder: "email"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Send",
          handler: data => {
            if (data.email) {
              //add preloader
              let loading = this.loading.create({
                dismissOnPageChange: true,
                content: "comprobando si existe email asociado..."
              });
              //call to database
              this.auth.recoverPassword(data.email)
              .subscribe((response: any) => {
                if(response.success == "email enviado con exito"){
                  loading.dismiss().then(() => {
                    //show pop up confirming that mail has been sent
                    let alert = this.alert.create({
                      title: "Comprueba tu email",
                      subTitle: "email enviado correctamente!",
                      buttons: ["OK"]
                    });
                    alert.present();
                  })} 
              });
            }
          }
        }
      ]
    });
    alert.present();
    // this.navCtrl.push(RecoverPasswordPage)
  }
}
