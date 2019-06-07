import { Component, OnInit } from '@angular/core';
import { PutnikService } from 'src/app/putnik.services';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['../app.component.css']
})
export class CenovnikComponent implements OnInit {

  kartas = ['VremenskaKarta', 'DnevnaKarta', 'MesecnaKarta','GodisnjaKarta'];
  korisniks = ['Regularan', 'Djak', 'Penzioner'];
  izabranaKarta: any;
  izabraniKorisnik: any;

  tempCena: number;
  cena: number;

  constructor(private service: PutnikService, private router: Router) { }

  ngOnInit() {
    this.izabranaKarta = this.kartas[0];
    this.izabraniKorisnik = this.korisniks[0];
    this.tempCena = 65;
  }

  onSelectKarta(event : any)
  {
    this.izabranaKarta = event.target.value;
    this.service.getCena(this.izabranaKarta, this.izabraniKorisnik).subscribe(cena => this.tempCena = cena);
    //this.router.navigate(['login']); 
    

  }

  onSelectKorisnik(event : any)
  {
    this.izabraniKorisnik = event.target.value;
    this.service.getCena(this.izabranaKarta, this.izabraniKorisnik).subscribe(cena => this.tempCena = cena);
  }

  
}
