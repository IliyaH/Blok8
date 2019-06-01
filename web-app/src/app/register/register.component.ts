import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterComponent implements OnInit {

  vrednost: any = "Pocetak";
  brojac = 0;
  constructor() { }

  ngOnInit() {
    
  }

  onSelect(event : any)
  {
    this.vrednost = event.target.value;
  }

}

