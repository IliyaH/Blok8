import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import {Putnik} from '../classes';
import {PutnikService} from '../putnik.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    lozinka: ['', Validators.required],
  });

  tempPutniks: Putnik[] = [];

  tempPutnik: Putnik = new Putnik;

  loggedIn: boolean = false;

  constructor(public router: Router, private fb: FormBuilder, private putnikService: PutnikService) {
    
  }

  get f() 
  {
    return this.loginForm.controls;
  }

  login()
  {

    for (let i = 0; i < this.tempPutniks.length; i++) {
      if(this.loginForm.controls.email.value == this.tempPutniks[i].Email && this.loginForm.controls.lozinka.value == this.tempPutniks[i].Lozinka)
      {
        this.loggedIn = true;
        this.tempPutnik = this.tempPutniks[i];
        console.log('Uspesno logovanje');
        console.log(this.tempPutnik);
        break;
      }
    }
    if(!this.loggedIn){
      console.log('Neuspesno logovanje!');
    }
  }

  ngOnInit(){
    this.getPutniks();
  }

  getPutniks(): void{
    this.putnikService.getPutniks().subscribe(putnik => this.tempPutniks = putnik)
  }
}
