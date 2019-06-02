import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent {

  constructor() 
  { 
  }
 
  mojeIme : any;
  mojaSifra : any;


  onSubmit(value)
  {
    this.mojeIme = value.email
    this.mojaSifra = value.lozinka;
    console.log(this.mojaSifra + "----" + this.mojeIme) ;
  }
}
