import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AddressProvider } from '../../providers/address/address';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  telephone: number;
  postalCode: number;
  address;
  autocompleteItems = [];
  autocomplete;
  service = new google.maps.places.AutocompleteService();
  user: any;
  formInfo: any = {
    streetName: '',
    floor: '',
    postalCode: '',
    coordinates: []
  };
  placesService = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addressServ: AddressProvider,
    public authServ: AuthProvider,
    public viewCtrl: ViewController,
    private zone: NgZone,
    public userServ: UserProvider
  ) {
    this.address = {
      place: ''
    };
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    }
  }

  ionViewDidLoad() {
    this.user = this.authServ.user;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getItemCoordinates(item) {
    return new Promise((resolve, reject) => {
      this.placesService.getDetails(
        {
          placeId: item.place_id
        },
        function(place) {
          resolve(place);
        }
      );
    });
  }

  chooseItem(item: any) {
    this.getItemCoordinates(item).then((place: any) => {
      let postalCode = Number(place.formatted_address.split(", ")[2].split(" ")[0]);
      let address = place.name;
      this.formInfo.postalCode = postalCode;
      this.formInfo.streetName = address;
    });
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions(
      {
        input: this.autocomplete.query
      },
      function(predictions: any, status) {
        if (!predictions)
          predictions = [{ description: 'no hay una calle especificada' }];
        me.autocompleteItems = [];
        me.zone.run(function() {
          predictions.forEach(function(prediction) {
            me.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  addAddress() {
    const userId = this.user._id;
    const { telephone, streetName, floor, postalCode } = this.formInfo;
    if( telephone === undefined || postalCode === undefined || streetName ===  undefined || floor === undefined)
    { console.log('you must fill in all details') 
    } else {
      this.addressServ
      .addNewAddress(userId, streetName, floor, postalCode)
      .subscribe(() => {
        this.userServ.updateUser(telephone, userId).subscribe(()=>{
          { this.navCtrl.setRoot('RestaurantListPage') }
        })
      });
    }
  }
}
