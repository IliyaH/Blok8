import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['../app.component.css']
})
export class CenovnikComponent implements OnInit {

  kartas = ['Vremenska', 'Dnevna', 'Mesecna','Godisnja'];
  korisniks = ['Regularan', 'Djak', 'Penzioner'];
  izabranaKarta: any;
  izabraniKorisnik: any;

  constructor() { }

  ngOnInit() {
    this.izabranaKarta = this.kartas[0];
    this.izabraniKorisnik = this.korisniks[0];
  }

  onSelectKarta(event : any)
  {
    this.izabranaKarta = event.target.value;
  }

  onSelectKorisnik(event : any)
  {
    this.izabraniKorisnik = event.target.value;
  }

  
}
