import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Validators } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    lozinka: ['', Validators.required],
  });

  constructor(public router: Router, private fb: FormBuilder) {
    
  }

  get f() 
  {
    return this.loginForm.controls;
  }

  login()
  {
      console.log(this.loginForm.value);
  }
  onSubmit(value)
  {
    
  }
}
