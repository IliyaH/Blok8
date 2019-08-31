import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { PricelistService } from 'src/app/services/pricelist/pricelist.service';
import { getLocaleDateTimeFormat, DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-pricelist',
  templateUrl: './manage-pricelist.component.html',
  styleUrls: ['./manage-pricelist.component.css']
})
export class ManagePricelistComponent implements OnInit {

  pricelistForm = this.fb.group({
    timeTicket: ['', Validators.required],
    dayTicket: ['', Validators.required],
    monthTicket: ['', Validators.required],
    yearTicket: ['', Validators.required],
    from: [''],
    to: [''],
  });

  pricelistAddForm = this.fb.group({
    timeTicket: ['', Validators.required],
    dayTicket: ['', Validators.required],
    monthTicket: ['', Validators.required],
    yearTicket: ['', Validators.required],
    from: [''],
    to: ['', Validators.required],
  });

  pricelist: any;
  prices: any[] = [];
  date: Date = new Date;

  constructor(private fb: FormBuilder, private pricelistService: PricelistService) { }

  ngOnInit() {
    this.pricelistService.getPrices().subscribe(
      data => {
        this.pricelist = data[0];
        this.prices = data[1];
        this.pricelistForm.controls.timeTicket.setValue(this.prices[0]);
        this.pricelistForm.controls.dayTicket.setValue(this.prices[1]);
        this.pricelistForm.controls.monthTicket.setValue(this.prices[2]);
        this.pricelistForm.controls.yearTicket.setValue(this.prices[3]);
        this.pricelistForm.controls.from.setValue(this.pricelist.Start);
        this.pricelistForm.controls.to.setValue(this.pricelist.End);
      } 
    );
    this.pricelistAddForm.controls.from.setValue(this.date.toLocaleDateString() + " " + this.date.toLocaleTimeString());
  }

  editPricelist(){
    this.pricelistService.editPricelist(this.pricelist.Id, this.pricelistForm.controls.timeTicket.value, this.pricelistForm.controls.dayTicket.value, this.pricelistForm.controls.monthTicket.value, this.pricelistForm.controls.yearTicket.value).subscribe();
  }

  addPricelist(){
    this.pricelistService.addPricelist(this.pricelistAddForm.controls.to.value, this.pricelistAddForm.controls.timeTicket.value, this.pricelistAddForm.controls.dayTicket.value, this.pricelistAddForm.controls.monthTicket.value, this.pricelistAddForm.controls.yearTicket.value).subscribe(
      data =>{
        this.pricelistAddForm.reset();
        this.pricelistAddForm.controls.from.setValue(this.date.toLocaleDateString() + " " + this.date.toLocaleTimeString());

      }
    );
  }

}
