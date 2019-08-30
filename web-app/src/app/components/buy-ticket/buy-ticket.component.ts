import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  loggedIn = undefined;
  userData : any;
  userProfileActivated: any;
  userProfileType: any;
  selectedTicketType: any;
  price: any;
  addTicket: any;
  email: any;

  constructor(private userService: UserService, private ticketService: TicketService) { }

  ngOnInit() {
    this.loggedIn = localStorage['role'];
    this.selectedTicketType = "TimeTicket";
    this.getUser();
    
  }

  onSelectTicketType(event : any){
    this.selectedTicketType = event.target.value;
    this.getUser();
  }

  getUser(){
      if(localStorage.getItem('name'))
      {
        this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
        this.userData = data;
        this.userProfileActivated = this.userData.Activated;
        this.userProfileType = this.userData.UserType;
        
        if(this.userProfileActivated != 1)
        {
          this.userProfileType = 0;
        }
        this.ticketService.getCena(this.selectedTicketType, this.userProfileType).subscribe( data => this.price = data);
  
      });
      }
      else
      {
        this.ticketService.getCena(this.selectedTicketType, 0).subscribe( data => this.price = data);
      }
  }

  buyTicket(){
    this.ticketService.addTicket(this.price, this.selectedTicketType, localStorage.getItem('name'), this.email).subscribe( data => this.addTicket = data);
    window.alert("You've buyed a ticked");
  }

}
