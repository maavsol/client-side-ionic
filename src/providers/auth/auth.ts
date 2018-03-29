import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/api/auth`;

@Injectable()
export class AuthProvider {
  options:object = {
    withCredentials:true,
  }

  errors: Array<string> = [
    'usuario o contraseña incorrecto',
    'no puedes campos vacíos'
  ]

  user:object;
  loginEvent:EventEmitter<object> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  handleError(e) {
    return Observable.throw(e.message);
  }

  handleUser(obj) {
    this.user = obj;
    this.loginEvent.emit(this.user);
    return this.user;
  }

  signup(username,password) {
    console.log('entro serv')
    console.log(username, password)
    return this.http.post(`${BASE_URL}/signup`, {username, password}, this.options)
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  login(username:string, password:string) {
    console.log(`Login with user:${username} and password ${password}`);
    return this.http.post(`${BASE_URL}/login`, {username, password}, this.options)
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  logout() {
    console.log('intento hacer logout')
    return this.http.get(`${BASE_URL}/logout`,this.options)
      .map(user => this.handleUser(null))
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${BASE_URL}/loggedin`,this.options)
  }

}