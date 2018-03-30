import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import { OrderProvider } from "../../providers/order/order";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: "page-restaurant-list",
  templateUrl: "restaurant-list.html"
})
export class RestaurantListPage {
  address: any;
  user: any;
  restaurants: any;
  buttonDisabled: boolean = true;
  colors: Array<object>;
  restaurantId: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restaurantServ: RestaurantProvider,
    public orderServ: OrderProvider,
    public auth: AuthProvider
  ) {}

  ionViewDidLoad() {
    this.user = this.auth.user;
    console.log('esto esta mis params')
    console.log(this.navParams.data)
    // this.address = this.navParams.data;
    this.restaurantServ
      .getRestaurants()
      .subscribe((restaurants: Array<any>) => {
        this.restaurants = restaurants;
        this.setInitialColors();
      });
  }

  setInitialColors(){
    this.colors = this.restaurants.map(e=>{
      return {'background':'white'}
    })
  }
  changeColor(index){
    this.setInitialColors();
    this.colors[index] ={'background':'red'}
    this.buttonDisabled = false;
  }

  saveRestaurantId(id){
    this.restaurantId = id;
  }

  navigateToNextPage() {
    this.navCtrl.setRoot('ConfirmationPage');
  }
}
