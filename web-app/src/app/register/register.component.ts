import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Validators, FormGroup } from  '@angular/forms';
import { Router } from '@angular/router';
import {Putnik} from '../classes';
import {PutnikService} from '../putnik.services';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterComponent implements OnInit {

  putniks = ['Regularan', 'Djak' , 'Penzioner'];

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
    
  }, {validator: this.checkPassword});

  vrednost: any;

  tempPutniks: Putnik[] = [];

  tempPutnik: Putnik = new Putnik();

  registered: boolean = false;


  constructor(public router: Router, private fb: FormBuilder, private putnikService: PutnikService) {
    
  }

  ngOnInit(){
    this.getPutniks();
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

  register(): void
  {  
    for (let i = 0; i < this.tempPutniks.length; i++) {
      if(this.registerForm.controls.email.value == this.tempPutniks[i].Email)
      {
        this.registered = true;
        console.log('Korisnik vec postoji');
      }
    }
    if(this.registered == false)
    {
      this.tempPutnik.Adresa = this.registerForm.controls.adresa.value;
      this.tempPutnik.DatumRodjenja = this.registerForm.controls.datumRodjenja.value;
      this.tempPutnik.Email = this.registerForm.controls.email.value;
      this.tempPutnik.Ime = this.registerForm.controls.ime.value;
      this.tempPutnik.Lozinka = this.registerForm.controls.lozinka.value;
      this.tempPutnik.PonovljenaLozinka = this.registerForm.controls.ponovljenaLozinka.value;
      this.tempPutnik.Prezime = this.registerForm.controls.prezime.value;
      this.tempPutnik.Slika = this.registerForm.controls.slika.value;
      this.tempPutnik.TipKorisnika = this.registerForm.controls.tipKorisnika.value;
      
      this.putnikService.addPutnik(this.tempPutnik)
      .subscribe(putnik => {this.tempPutniks.push(putnik);
     });
    }
  }


  getPutniks(): void{
    this.putnikService.getPutniks().subscribe(putnik => this.tempPutniks = putnik)
  }


}

