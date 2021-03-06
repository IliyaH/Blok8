import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getUserInfo() {
    return this.httpClient.get('http://localhost:52295/api/Account/UserInfo')
  }
  getUserData(email:string): Observable<any>{
    return this.httpClient.get<any>('http://localhost:52295/api/Account/GetUserData?email='+email)
  }

  getNotActiveUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`http://localhost:52295/api/Account/GetNotActiveUsers`).pipe(
      catchError(this.handleError<any[]>(`getNotActiveUsers`)));
  }

  uploadImage(image: any): Observable<any>{
    console.log(image);
    return this.httpClient.post(`http://localhost:52295/api/Account/UploadImage/`, image);
  }
  downloadImage(email: string): Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:52295/api/Account/DownloadImage?email=`+email);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
