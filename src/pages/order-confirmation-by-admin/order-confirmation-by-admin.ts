import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderProvider } from "../../providers/order/order";

@IonicPage()
@Component({
  selector: 'page-order-confirmation-by-admin',
  templateUrl: 'order-confirmation-by-admin.html',
})
export class OrderConfirmationByAdminPage {
  orders: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderServ: OrderProvider) {
  }

  ionViewDidLoad() {
    this.orderServ.getAllOrders().subscribe((foundOrders) => {
      this.orders = foundOrders
    })
  }

}
