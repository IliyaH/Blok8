import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getUserInfo() {
    return this.httpClient.get('http://localhost:52295/api/Account/UserInfo')
  }
  getUserData(email:string) {
    return this.httpClient.get('http://localhost:52295/api/Account/GetUserData?email='+email)
  }
}
