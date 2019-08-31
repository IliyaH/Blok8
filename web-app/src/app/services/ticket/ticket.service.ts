import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { sendRequest } from 'selenium-webdriver/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  
    
  constructor(private http: HttpClient) { }

  getCena(ticketType:any , userType : any ): Observable<number> {
    return this.http.get<number>(`http://localhost:52295/api/Tickets/CalculatePrice?ticketType=${ticketType}&userType=${userType}`, { 'headers': { 'Content-type': 'application/x-www-form-urlencoded' } });
  }

  addTicket(ticketPrice: any, selectedTicketType: any, userName: any, email: any): Observable<any>{
    
    return this.http.post("http://localhost:52295/api/Tickets/Add",[ticketPrice, selectedTicketType, userName, email], { 'headers': { 'Content-type': 'application/x-www-form-urlencoded' } });
  }

  getTicket(id: any): Observable<any>{
    return this.http.get<any>("http://localhost:52295/api/Tickets/GetTicket?id="+id, { 'headers': { 'Content-type': 'application/x-www-form-urlencoded' } }).pipe(
      catchError(this.handleError<any>(`getTicket`)));
  }

  buyTicket(isLoggedIn: boolean, email: any, id: any, payer_email: any, payer_id: any, price: any, selectedTicketType: any, userProfileType: any): Observable<any>{
    return this.http.post<any>(`http://localhost:52295/api/Tickets/BuyTicket?isLoggedIn=${isLoggedIn}&email=${email}&id=${id}&payer_email=${payer_email}&payer_id=${payer_id}&price=${price}&selectedTicketType=${selectedTicketType}&userProfileType=${userProfileType}`, [isLoggedIn,email,id,payer_email, payer_id, price, selectedTicketType, userProfileType]).pipe(
      catchError(this.handleError<any>(`buyTicket`)));
  }

  /*buyTicket(email: any, id: any, payer_email: any, payer_id: any, price: any, selectedTicketType: any, userProfileType: any) : Observable<any>
  {
    console.log("CMARRRRR");
   return this.http.post<any>(`http://localhost:52295/api/Tickets/BuyTicket?email=${email}&id=${id}&payer_email=${payer_email}&payer_id=${payer_id}&price=${price}&selectedTicketType=${selectedTicketType}&userProfileType=${userProfileType}`,[email, id, payer_id, payer_id, price, selectedTicketType, userProfileType], { 'headers': { 'Content-type': 'application/x-www-form-urlencoded' } }).pipe(
    catchError(this.handleError<any>(`buyTicket`)));
  }*/

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}
