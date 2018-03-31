import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmationByAdminPage } from './order-confirmation-by-admin';

@NgModule({
  declarations: [
    OrderConfirmationByAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationByAdminPage),
  ],
})
export class OrderConfirmationByAdminPageModule {}
