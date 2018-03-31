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
  order: any;
  myQuantityArray: any;
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
    this.address = this.navParams.data.address;
    this.order = this.navParams.data.order
    console.log(this.order)
    this.myQuantityArray = this.calculateQuantities(this.order)
    this.restaurantServ
      .getRestaurants()
      .subscribe((restaurants: Array<any>) => {
        this.restaurants = restaurants
        // let arrayOfTotalPrices = this.setTotalPrice(this.restaurants, this.myQuantityArray)
        // arrayOfTotalPrices.map((e, i) => {
        //   this.restaurants[i].totalPriceOfOrder = e
        // })
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

  createOrder(){
    let userId = this.user._id
    let quantities = this.myQuantityArray
    let address = this.address
    let restaurantId = this.restaurantId
    this.orderServ.createOrder(userId, quantities, address, restaurantId).subscribe((order: any) => {
      this.navigateToNextPage(order._id)
    })
  }


  navigateToNextPage(data) {
    this.navCtrl.setRoot('ConfirmationPage', data);
  }

  calculateQuantities(array) {
    let hamAndCheeseQ = 0;
    let pepperoniQ = 0;
    let fourCheeseQ = 0;
    let barbacueQ = 0;
   array.map((e) => {
      if (e.name === 'PEPPERONI') {
        pepperoniQ = e.number;
      }
      if (e.name === 'JAMON Y QUESO') {
        hamAndCheeseQ = e.number;
      }
      if (e.name === 'CUATRO QUESOS') {
        fourCheeseQ = e.number;
      }
      if (e.name === 'BARBACOA') {
        barbacueQ = e.number;
      }
    });
    return { pepperoniQ: pepperoniQ, hamAndCheeseQ: hamAndCheeseQ, fourCheeseQ: fourCheeseQ, barbacueQ: barbacueQ};
  }

  // setTotalPrice(restaurants, quantityArray){
  //   let result = []
  //   restaurants.map(e => {
  //     let totalPep = e.pepperoniPrice * quantityArray.pepperoniQ
  //     let totalFourCheese = e.fourCheesePrice * quantityArray.fourCheeseQ
  //     let totalBarbacue = e.barbacuePrice * quantityArray.barbacueQ
  //     let totalHamAndCheese = e.hamAndCheesePrice * quantityArray.hamAndCheeseQ
  //     let totalOrder = totalPep + totalFourCheese + totalBarbacue + totalHamAndCheese
  //     result.push(totalOrder)
  //   })
  //   return result
  // }
}