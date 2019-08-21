import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sendRequest } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  
    
  constructor(private http: HttpClient) { }

  getCena(ticketType:any , userType : any ): Observable<number> {
    return this.http.get<number>(`http://localhost:52295/api/Tickets/CalculatePrice?ticketType=${ticketType}&userType=${userType}`);
  }

  addTicket(ticketPrice: any, selectedTicketType: any, userName: any, email: any): Observable<any>{
    
    return this.http.post("http://localhost:52295/api/Tickets/Add",[ticketPrice, selectedTicketType, userName, email]);
  }


}
