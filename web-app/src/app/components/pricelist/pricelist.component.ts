import { Component, OnInit } from '@angular/core';
import {TicketService} from 'src/app/services/ticket/ticket.service'

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  selectedTicketType: any = 'TimeTicket';
  selectedUserType: any = 'RegularUser';
  price : number;

  constructor( private ticketService : TicketService) { }

  ngOnInit() {
    this.selectedTicketType = "0";
    this.selectedUserType = "0";
    this.ticketService.getCena(this.selectedTicketType, this.selectedUserType).subscribe(tempPrice => this.price = tempPrice);
    
  }

  onSelectTicketType(event : any){
    this.selectedTicketType = event.target.value;
    this.ticketService.getCena(this.selectedTicketType, this.selectedUserType).subscribe(tempPrice => this.price = tempPrice);
  }

  onSelectUserType(event : any){
    this.selectedUserType = event.target.value;
    this.ticketService.getCena(this.selectedTicketType, this.selectedUserType).subscribe(tempPrice => this.price = tempPrice);
  }

}
