import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/api/address`;

@Injectable()
export class AddressProvider {
  options: object = { withCredentials: true }
  constructor(public http: HttpClient) {
    console.log('Hello AddressProvider Provider');
  }

findUserAddresses(id){
  return this.http.get(`${BASE_URL}/findUserAddresses/${id}`, this.options)
}

addNewAddress(id){
  return this.http.post(`${BASE_URL}/addNewAddress/${id}`, this.options)
}

updateAddress(id, data){
  return this.http.post(`${BASE_URL}/editAddress/${id}`, { data }, this.options)
}

deleteAddress(id){
  return this.http.post(`${BASE_URL}/deleteAddress/${id}`, this.options)
}

}
