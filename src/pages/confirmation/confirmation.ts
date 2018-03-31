import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderProvider } from "../../providers/order/order";

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  order: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderServ: OrderProvider) {
  }

  ionViewDidLoad() {
    const orderId = this.navParams.data
    this.orderServ.findMyOrder(orderId).subscribe((a)=>{

    this.order = a
  console.log(this.order)})

  }

}