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
  selectedStationId: any = "";

  constructor(private fb: FormBuilder, private menageService: MenageService) { }

  ngOnInit() {
    this.getStations();
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
    });
  }

  onSelect(event : any){
    this.selectedStationId = event.target.value;
    this.menageService.getStation(this.selectedStationId).subscribe(data=>{
      this.stationForm.controls.name.setValue(data.Name);
      this.stationForm.controls.address.setValue(data.Address);
      this.stationForm.controls.xCoordinate.setValue(data.XCoordinate);
      this.stationForm.controls.yCoordinate.setValue(data.YCoordinate);
    });
  }


  onClickDelete(){
    this.menageService.deleteStation(this.selectedStationId).subscribe(
      d=>{
        this.getStations();
        this.selectedStationId = "";
        this.stationForm.reset();
        
        const index: number = this.stations.indexOf(d);
          if (index !== -1) {
          this.stations.splice(index, 1);
          }  
      }
    );
  }


}
