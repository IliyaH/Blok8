import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  selectedTicketType: string = 'TimeTicket';
  selectedUserType: string = 'RegularUser';

  constructor() { }

  ngOnInit() {
    let ilija = localStorage['role'];
    console.log(ilija);
  }

  onSelectTicketType(event : any){
    this.selectedTicketType = event.target.value;
  }

  onSelectUserType(event : any){
    this.selectedUserType = event.target.value;
  }

}
