import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/api/restaurant`;

@Injectable()
export class RestaurantProvider {
  options: object = { withCredentials: true }
  constructor(public http: HttpClient) {
  }

  getRestaurants(){
    return this.http.get(`${BASE_URL}/getAllRestaurants`, this.options)
  }

}
