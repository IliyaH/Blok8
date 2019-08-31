import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;
  base_url = "http://localhost:52295"
  constructor(private http: Http, private httpClient:HttpClient) { }

  register(user): Observable<any>{
    return this.httpClient.post<any>(this.base_url+"/api/Account/Register",user).pipe(
      catchError(this.handleError<any>(`register`)));
  }

  brisac(user): Observable<any>{
    return this.httpClient.post(this.base_url+"/api/Account/Brisac",user);
  }

  edit(user): Observable<any>{
    console.log(user);
    return this.httpClient.post(this.base_url+"/api/Account/Edit",user);
  }

  login(email: any, password: any){
    let data = `username=${email}&password=${password}&grant_type=password`;
    let headers = new HttpHeaders();
    headers = headers.append( "Content-type","application/x-www-fore-urlencoded");

    if(!localStorage.jwt){
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
      return this.httpClient.post(this.base_url+"/oauth/token",data,{"headers":headers}).pipe(
        catchError(this.handleError<any>(`login`))) as Observable<any>
    }
    else{
     window.location.href = "/login";
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('randid');
  }

  getTypes() {
    return this.httpClient.get(this.base_url+"/api/Types/GetTypes");
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
