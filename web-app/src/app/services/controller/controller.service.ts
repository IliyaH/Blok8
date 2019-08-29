import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private httpClient: HttpClient) { }

  validateUser(email: any, validate: boolean): Observable<any>{//
    return this.httpClient.post<any>(`http://localhost:52295/api/Account/ValidateUser?email=${email}&validate=${validate}`, [email, validate]).pipe(
      catchError(this.handleError<any>(`validateUser`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
