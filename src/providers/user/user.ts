import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_DOMAIN = "http://localhost:3000";
const BASE_URL = `${BASE_DOMAIN}/api/user`;

@Injectable()
export class UserProvider {
  options: object = {
    withCredentials: true
  };

  constructor(public http: HttpClient) {
  }

  updateUser(info, userId){
    return this.http.post(`${BASE_URL}/update/${userId}`, { info }, this.options)
  }

}
