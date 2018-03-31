import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderProvider } from "../../providers/order/order";

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderServ: OrderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
    console.log(this.navParams.data)
    const orderId = this.navParams.data
    this.orderServ.findMyOrder(orderId).subscribe((a)=>
  console.log(a))

  }

}
