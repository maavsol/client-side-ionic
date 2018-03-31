import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, Modal } from "ionic-angular";

import { AuthProvider } from "../../providers/auth/auth";
import { AddressProvider } from "../../providers/address/address";
import { OrderProvider } from "../../providers/order/order";
import { RestaurantProvider } from "../../providers/restaurant/restaurant" 

@IonicPage()
@Component({
  selector: "page-pizza-menu",
  templateUrl: "pizza-menu.html"
})
export class PizzaMenuPage {
  user: any;
  pizzas: any[] = [
    {
      name: "PEPPERONI",
      image:
        "http://res.cloudinary.com/ddesyiweo/image/upload/v1514023273/pizza-icon-vector-illustration-60015303_ycovbj.jpg",
      number: 0,
      nameToCheck: "peperonniPrice"
    },
    {
      name: "JAMON Y QUESO",
      image:
        "http://res.cloudinary.com/ddesyiweo/image/upload/v1514023273/pizza-icon-vector-illustration-60015303_ycovbj.jpg",
      number: 0,
      nameToCheck: "jamonYQuesoPrice"
    },
    {
      name: "CUATRO QUESOS",
      image:
        "http://res.cloudinary.com/ddesyiweo/image/upload/v1514023273/pizza-icon-vector-illustration-60015303_ycovbj.jpg",
      number: 0,
      nameToCheck: "cuatroQuesosPrice"
    },
    {
      name: "BARBACOA",
      image:
        "http://res.cloudinary.com/ddesyiweo/image/upload/v1514023273/pizza-icon-vector-illustration-60015303_ycovbj.jpg",
      number: 0,
      nameToCheck: "barbacoaPrice"
    }
  ];
  pizzasOrdered: any[] = [];
  counter: number = 0;
  buttonDisabled: boolean = true;
  userId: string;
  userAddresses: any;
  fullAddress: any;
  addressName: string;
  calculatedPrices: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public addressServ: AddressProvider,
    public orderServ: OrderProvider,
    public modalCtrl: ModalController,
    public restServ: RestaurantProvider
  ) {}

  ionViewDidLoad() {
    this.user = this.auth.user;
    console.log(this.user)
    this.userId = this.user._id
    this.addressServ.findUserAddresses(this.userId).subscribe((foundAddresses: any)=>{
      if(foundAddresses.length !== 0){
        this.userAddresses = foundAddresses
      }
      if(this.userAddresses){
        this.fullAddress = this.userAddresses[0]
        this.addressName = this.fullAddress.streetName
      } 
    })
  }

  checkIfThereIsOrder() {
    if (this.pizzasOrdered.length === 0) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
  }

  addPizzaToOrder(pizzaIndex) {
    let add = this.pizzas[pizzaIndex];
    let foundPizza = this.pizzasOrdered.find(
      element => element.name == add.name
    );
    add.number++;
    if (foundPizza == undefined) this.pizzasOrdered.push(add);
    this.checkIfThereIsOrder();
  }

  reduceOrder(pizzaIndex) {
    if (this.pizzasOrdered.length > 0) {
      let reduce = this.pizzas[pizzaIndex];
      let foundPizza = this.pizzasOrdered.find(
        element => element.name == reduce.name
      );
      if (foundPizza !== undefined) foundPizza.number--;
      if (foundPizza.number == 0) {
        this.pizzasOrdered = this.pizzasOrdered.filter(
          element => element.name !== foundPizza.name
        );
      }
      this.checkIfThereIsOrder();
    }
  }

  navigateToNextPage() {
    this.orderServ.pizzasOrdered = this.pizzasOrdered;
    this.restServ.orderedPizzas = this.pizzasOrdered;
    let order = this.pizzasOrdered
    let address = this.fullAddress
    let data = { order, address }
    this.userAddresses === undefined
      ? this.navCtrl.push('AddressPage', this.pizzasOrdered)
      : this.navCtrl.push('RestaurantListPage', data);

  }

  openMenu() {
    let profileModal: Modal = this.modalCtrl.create('AddressListPage');
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if(data){
        this.fullAddress = data
        this.addressName = data.streetName
      }
    })
  }

 

}
