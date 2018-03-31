import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/api/order`;

@Injectable()
export class OrderProvider {
  options: object = { withCredentials: true }
  pizzasOrdered: any;
  
  constructor(public http: HttpClient) {
  }

  createOrder(userId, quantities, address, restaurantId){
    console.log('al servicio entro')
    console.log(userId, quantities, address, restaurantId)
    return this.http.post(`${BASE_URL}/createOrder`, {userId, quantities, address, restaurantId}, this.options)
  }

}
