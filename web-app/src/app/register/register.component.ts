import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterComponent {

  putnik = ['Regularan', 'Djak' , 'Penzioner'];

  vrednost: any = "Pocetak";
  brojac = 0;

  constructor() 
  {    
  }

  onSelect(event : any)
  {
    this.vrednost = event.target.value;
  }

  onSubmit(value)
  {
    this.brojac
    console.log(value) ;
  }

}

