import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, AlertController } from "ionic-angular";

import { AuthProvider } from "../../providers/auth/auth";
import { UserProvider } from "../../providers/user/user";
import { AddressProvider } from "../../providers/address/address";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  user: any;
  password: String;
  userId: String;
  toastMessage: String[] = [
    "El usuario se ha editado correctamente",
    "Has dejado campos vacios"
  ];
  addresses: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public userServ: UserProvider,
    public alert: AlertController,
    public toast: ToastController,
    public addressServ: AddressProvider
  ) {}

  ionViewDidLoad() {
    this.user = this.auth.user;
    this.userId = this.user._id;
    this.addressServ.findUserAddresses(this.userId).subscribe((foundAddresses)=> this.addresses = foundAddresses)
  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 3000,
      position: "bottom",
      showCloseButton: true,
      closeButtonText: "X"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  presentPrompt(message, field, type) {
    let alert = this.alert.create({
      title: "Editar",
      message: message,
      inputs: [
        {
          name: field,
          placeholder: field,
          type: type
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
          text: "OK",
          handler: data => {
            if (data) {
              this.userServ
                .updateUser(data, this.userId)
                .subscribe((newInfo: any) => {
                  this.user.username = newInfo.username;
                  this.presentToast("usuario actualizado correctamente");
                });
            }
          }
        }
      ]
    });
    alert.present();
  }

  changeUsername() {
    this.presentPrompt("Introduce tu nuevo email", "email", "email");
  }

  changePassword() {
    this.presentPrompt("Introduce tu nueva contraseña", "contrasena", "password");
  }

  addOrChangeTelephone(){
    this.presentPrompt("Introduce tu número de telefono", "telephone", "tel")
  }

  presentAddressPrompt(addressId, streetName, floor, postalCode, i) {
    let alert = this.alert.create({
      title: "Editar",
      message: 'edita tu dirección de entrega',
      inputs: [
        {
          name: 'streetName',
          label: 'calle',
          placeholder: 'calle',
          value: streetName,
          type: 'text'
        },
        {
          name: 'floor',
          label: 'piso',
          placeholder: 'piso',
          value: floor,
          type: 'text'
        },
        {
          name: 'postalCode',
          label: 'C.P.',
          placeholder: 'C.P.',
          value: postalCode,
          type: 'text'
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
          text: "OK",
          handler: data => {
            if (data) {
              this.addressServ
                .updateAddress(addressId, data)
                .subscribe((newInfo: any) => {
                  this.addresses[i].streetName = newInfo.streetName;
                  this.addresses[i].floor = newInfo.floor;
                  this.addresses[i].postalCode = newInfo.postalCode;
                  this.presentToast("dirección actualizada correctamente");
                });
            }
          }
        }
      ]
    });
    alert.present();
  }

  deleteAddress(id, i){
    
    this.addressServ.deleteAddress(id).subscribe(()=>
    {this.addresses.splice(i, 1)
     this.presentToast("dirección eliminada correctamente")})
  }

  presentConfirm(id, i) {
    let alert = this.alert.create({
      title: 'Confirm purchase',
      message: 'Quieres borrar esta dirección?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Borrar',
          handler: () => {
            this.deleteAddress(id, i)
          }
        }
      ]
    });
    alert.present();
  }

  logout(){
    this.auth.logout().subscribe(()=>{
      this.navCtrl.setRoot('HomePage')
    })
  }
}
