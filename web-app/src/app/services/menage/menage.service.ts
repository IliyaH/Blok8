import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Http, Response } from '@angular/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenageService {

  constructor(private http: Http, private httpClient:HttpClient) { }
  base_url = "http://localhost:52295"

  addStation(station: any): Observable<any>{
    return this.httpClient.post<any>(this.base_url+"/api/Stations",station).pipe(
      catchError(this.handleError<any>(`addStation`)));
  }

  getStations(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.base_url+"/api/Stations").pipe(
      catchError(this.handleError<any[]>(`getStations`)));
  }

  getStation(id: any): Observable<any>{
    return this.httpClient.get<any>(this.base_url+`/api/Stations/${id}`).pipe(
      catchError(this.handleError<any>(`getStation`)));
  }

  deleteStation(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.base_url+`/api/Stations/Delete?id=${id}`).pipe(
      catchError(this.handleError<any>(`deleteStation`)));
  }

  editStation(station: any, id: any): Observable<any>{
    return this.httpClient.post<any>(this.base_url+`/api/Stations/Edit?station=${station}&id=${id}`, station, id).pipe(
      catchError(this.handleError<any>(`editStation`)));
  }

  findLines(id: any): Observable<any>{
    return this.httpClient.get<any>(this.base_url+`/api/Stations/FindLine?id=${id}`, id).pipe(
      catchError(this.handleError<any>(`findLine`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
