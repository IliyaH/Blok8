import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map ,} from 'rxjs/operators';
import { Putnik } from './classes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PutnikService {

    private putniksUrl = 'http://localhost:52295/api/Korisniks';  // URL to web api
    
    constructor(private http: HttpClient) { }

    //GETS ALL PUTNIKS
    getPutniks(): Observable<Putnik[]>{
        return this.http.get<Putnik[]>(this.putniksUrl)
        .pipe(
          catchError(this.handleError<Putnik[]>('getPutniks', []))
        );
    }

    //ADD NEW PUTNIK    
    public addPutnik(putnik: Putnik): Observable<Putnik>{
        return this.http.post<Putnik>(this.putniksUrl, putnik, httpOptions).pipe(
            catchError(this.handleError<Putnik>('addPutnik')));
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
      }
}