import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PizzaMenuPage } from './pizza-menu';

@NgModule({
  declarations: [
    PizzaMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PizzaMenuPage),
  ],
})
export class PizzaMenuPageModule {}
