import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

interface User {
  username:string,
  password:string
}

@Injectable()
export class AuthProvider {
  
  BASEURL:string = "http://localhost:3000"
  options:object = {withCredentials:true};

  constructor(public http: HttpClient) {
    // this.isLoggedIn().subscribe();
  }

  private user:User;
  private userEvent:EventEmitter<any>;

  getUser(){
    return this.user;
  }

  getUserEvent(){
    return this.userEvent;
  }

  private configureUser(set=false){
    return (user) => {
      if(set){
        this.user = user;
        this.userEvent.emit(user);
      }else{
        this.user = null
        this.userEvent.emit(null);
      }
      return user;
    }
  }

  handleError(e) {
    return Observable.throw(e.message);
  }

  signup(username:string, password:string):Observable<any>{
    return this.http.post(`${this.BASEURL}/api/auth/signup`, {username,password}, this.options)
      .map(res => res)
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  login(username:string, password:string):Observable<any>{
    return this.http.post(`${this.BASEURL}/api/auth/login`, {username,password},this.options)
      .map(res => res)
      .map(this.configureUser(true))
      .catch(this.handleError);
  }

  logout():Observable<any>{
    return this.http.get(`${this.BASEURL}/api/auth/logout`,this.options)
      .map(res => res)
      .map(this.configureUser(false))
      .catch(this.handleError);
  }

  isLoggedIn():Observable<any> {
    return this.http.get(`${this.BASEURL}/api/auth/loggedin`,this.options)
      .map(res => res)
      .map(this.configureUser(true))
      .catch(this.handleError);
  }


}
