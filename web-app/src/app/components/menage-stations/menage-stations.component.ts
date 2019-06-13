import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MenageService } from 'src/app/services/menage/menage.service';
import { Station } from 'src/app/models/models';

@Component({
  selector: 'app-menage-stations',
  templateUrl: './menage-stations.component.html',
  styleUrls: ['./menage-stations.component.css']
})
export class MenageStationsComponent implements OnInit {

  stationForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    xCoordinate: ['', Validators.required],
    yCoordinate: ['', Validators.required],
  });

  stations : Station[] = [];
  selectedStationId: any;
  visible: boolean;

  constructor(private fb: FormBuilder, private menageService: MenageService) { }

  ngOnInit() {
    console.log(this.stationForm.valid);
    this.getStations();
    this.visible = false; 
  }

  addStation(){
    this.menageService.addStation(this.stationForm.value).subscribe( data=>
      {
        window.alert('Station with ID: ' + data + ' added!');
        this.getStations();
      });
  }

  getStations(){
    this.menageService.getStations().subscribe(data=>{
      this.stations = data;
      console.log(this.stations);
    
    });
  }

  onSelect(event : any){
    this.selectedStationId = event.target.value;
    console.log(this.selectedStationId)
    this.menageService.getStation(this.selectedStationId).subscribe(data=>{
      this.stationForm.controls.name.setValue(data.Name);
      this.stationForm.controls.address.setValue(data.Address);
      this.stationForm.controls.xCoordinate.setValue(data.XCoordinate);
      this.stationForm.controls.yCoordinate.setValue(data.YCoordinate);
      console.log(data.Name);
      this.visible = true;
    });
  }



}
