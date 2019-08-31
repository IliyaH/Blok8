import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  constructor(private http: Http, private httpClient:HttpClient) { }
  base_url = "http://localhost:52295"

  getPrices(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.base_url+`/api/Pricelist/GetActivePricelists`).pipe(
      catchError(this.handleError<any[]>(`getPrices`)));
  }

  editPricelist(id: any, timeTicket: any, dayTicket: any, monthTicket: any, yearTicket: any): Observable<any[]>{
    return this.httpClient.post<any[]>(this.base_url+`/api/Pricelist/EditPricelist?id=${id}&timeTicket=${timeTicket}&dayTicket=${dayTicket}&monthTicket=${monthTicket}&yearTicket=${yearTicket}`, [id, timeTicket, dayTicket, monthTicket, yearTicket]).pipe(
      catchError(this.handleError<any[]>(`editPricelist`)));
  }

  addPricelist(to: any, timeTicket: any, dayTicket: any, monthTicket: any, yearTicket: any): Observable<any[]>{
    return this.httpClient.post<any[]>(this.base_url+`/api/Pricelist/AddPricelist?to=${to}&timeTicket=${timeTicket}&dayTicket=${dayTicket}&monthTicket=${monthTicket}&yearTicket=${yearTicket}`, [to, timeTicket, dayTicket, monthTicket, yearTicket]).pipe(
      catchError(this.handleError<any[]>(`addPricelist`)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
