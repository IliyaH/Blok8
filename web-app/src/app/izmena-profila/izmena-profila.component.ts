import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup } from  '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-izmena-profila',
  templateUrl: './izmena-profila.component.html',
  styleUrls: ['../app.component.css']
})
export class IzmenaProfilaComponent implements OnInit {

  izmeniForm = this.fb.group({
    ime: ['', Validators.required],
    prezime: ['', Validators.required],
    lozinka: ['', [Validators.required, Validators.minLength(8)]],
    ponovljenaLozinka: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    datumRodjenja: ['', Validators.required],
    adresa: ['', Validators.required],
    
  }, {validator: this.checkPassword});

  constructor(public router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  checkPassword(group: FormGroup)
  {
      let pass = group.controls.lozinka.value;
      let confirmPass = group.controls.ponovljenaLozinka.value;

      return pass == confirmPass ? null : {notSame: true}
  }

  izmeni()
  {
    
  }

}
