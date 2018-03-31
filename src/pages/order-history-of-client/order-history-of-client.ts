import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderProvider } from "../../providers/order/order";
import { AuthProvider } from '../../providers/auth/auth'

@IonicPage()
@Component({
  selector: 'page-order-history-of-client',
  templateUrl: 'order-history-of-client.html',
})
export class OrderHistoryOfClientPage {
  orders: any
  user: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderServ: OrderProvider, public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    this.user = this.auth.user
    this.orderServ.getUserOrders(this.user._id).subscribe((foundOrders) => {
      this.orders = foundOrders
      console.log(this.orders)
    })
  }

}
