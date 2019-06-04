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

    //TO DO: Pozovi funkcije i uradi DELETE PUTNIK
    //GETS ALL PUTNIK WITH ID 
    getPutnik(id: number): Observable<Putnik> {
      const url = `${this.putniksUrl}/${id}`;
      return this.http.get<Putnik>(url).pipe(
        catchError(this.handleError<Putnik>(`getPutnik id=${id}`))
      );
    }

    //ADD NEW PUTNIK    
    public addPutnik(putnik: Putnik): Observable<Putnik>{
        return this.http.post<Putnik>(this.putniksUrl, putnik, httpOptions).pipe(
            catchError(this.handleError<Putnik>('addPutnik')));
    }

    //DELETE PUTNIK
    
  
    //EDIT PUTNIK
    updatePutnik (putnik: Putnik): Observable<any> {
      return this.http.put(this.putniksUrl, putnik, httpOptions).pipe(
        catchError(this.handleError<any>('updatePutnik'))
      );
    }


    //ERROR HENDLER
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
      }
}