import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";

import { AuthProvider } from "../../providers/auth/auth";
import { AddressProvider } from "../../providers/address/address";

@IonicPage()
@Component({
  selector: "page-address-list",
  templateUrl: "address-list.html"
})
export class AddressListPage {
  user: any;
  userAddresses: any;
  selectedAddress: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public addressServ: AddressProvider,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    this.user = this.auth.user;
    this.getAllAddresses();
  }

  getAllAddresses() {
    this.addressServ.findUserAddresses(this.user._id).subscribe((info: any) => {
      this.userAddresses = info;
    });
  }

  dismiss() {
    if (this.selectedAddress) {
      let data = this.userAddresses[this.selectedAddress];
      this.viewCtrl.dismiss(data);
    }
  }

}
