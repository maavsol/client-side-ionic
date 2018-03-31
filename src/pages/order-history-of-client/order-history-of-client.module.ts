import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderHistoryOfClientPage } from './order-history-of-client';

@NgModule({
  declarations: [
    OrderHistoryOfClientPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderHistoryOfClientPage),
  ],
})
export class OrderHistoryOfClientPageModule {}
