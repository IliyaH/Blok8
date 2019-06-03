import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Validators, FormGroup } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterComponent {

  putnik = ['Regularan', 'Djak' , 'Penzioner'];

  registerForm = this.fb.group({
    ime: ['', Validators.required],
    prezime: ['', Validators.required],
    lozinka: ['', [Validators.required, Validators.minLength(8)]],
    ponovljenaLozinka: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    datumRodjenja: ['', Validators.required],
    adresa: ['', Validators.required],
    tipKorisnika: ['', Validators.required],
    slika: [''],
    dokument: [''],
  }, {validator: this.checkPassword});

  vrednost: any;

  constructor(public router: Router, private fb: FormBuilder) {
    
  }

  checkPassword(group: FormGroup)
  {
      let pass = group.controls.lozinka.value;
      let confirmPass = group.controls.ponovljenaLozinka.value;

      return pass == confirmPass ? null : {notSame: true}
  }

  get f() 
  {
    return this.registerForm.controls;
  }

  onSelect(event : any)
  {
    this.vrednost = event.target.value;
  }

  register()
  {
      console.log(this.registerForm.value);
  }

  onSubmit(value)
  {
    console.log(value) ;
  }

}

