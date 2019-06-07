import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEmitter } from 'protractor';
import {LoginClass} from '../app/classes';
@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  base_url = "http://localhost:52295"
  
      constructor(private http: HttpClient){
      }
  
      logIn(loginClass: LoginClass, callback: any){
          let data = `username=${loginClass.email}&password=${loginClass.lozinka}&grant_type=password`;
          let httpOptions = {
              headers: {
                  "Content-type": "application/x-www-form-urlencoded"
              }
          }
  
          this.http.post<any>(this.base_url + "/oauth/token", data, httpOptions)
          .subscribe(data => {
                
            let jwt = data.access_token;
  
            let jwtData = jwt.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
  
            let role = decodedJwtData.role
  
            console.log('jwtData: ' + jwtData)
            console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
            console.log('decodedJwtData: ' + decodedJwtData)
            console.log('Role ' + role)
  
            localStorage.setItem('jwt', jwt)
            localStorage.setItem('role', role);
            callback();
            
          } );
      }
}
