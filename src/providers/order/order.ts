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

  getAllOrders(){
    return this.http.get(`${BASE_URL}/getAllOrders`, this.options)
  }

  updateOrderStatus(id, message){
    return this.http.post(`${BASE_URL}/updateOrderStatus/${id}`, {message}, this.options)
  }

  createOrder(userId, quantities, address, restaurantId){
    return this.http.post(`${BASE_URL}/createOrder`, {userId, quantities, address, restaurantId}, this.options)
  }

  findMyOrder(id){
    console.log('entro en el servicio')
    console.log(id)
    return this.http.get(`${BASE_URL}/getMyOrder/${id}`, this.options)
  }

}
