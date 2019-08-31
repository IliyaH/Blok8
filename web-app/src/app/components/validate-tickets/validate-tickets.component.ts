import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-validate-tickets',
  templateUrl: './validate-tickets.component.html',
  styleUrls: ['./validate-tickets.component.css']
})
export class ValidateTicketsComponent implements OnInit {

  constructor(private fb: FormBuilder, private ticketService: TicketService) { }

  validateTicketForm = this.fb.group({
    id: ['', Validators.required],
    
  });
  ticketValid: any;
  show: boolean = false;
  showError: boolean = false;
  id: any;

  ngOnInit() {
  }

  check(){
    this.show = true;
    this.ticketService.getTicket(this.validateTicketForm.controls.id.value).subscribe(
      data=>{
        if(data == 200){
          this.ticketValid = true;
          this.showError = false;
        }
        else if(data == 204){
          this.ticketValid = false;
          this.showError = false;
        }
        else if(data == 205){
          this.show = false;
          this.showError = true;
        }
      }
    );
  }

  

}
