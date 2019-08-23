import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MenageService } from 'src/app/services/menage/menage.service';
import { Station, Line } from 'src/app/models/models';

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
  station : Station;
  lines : string[] = [];


  constructor(private fb: FormBuilder, private menageService: MenageService) { }

  ngOnInit() {
    this.getStations();
  }

  addStation(){
    this.menageService.addStation(this.stationForm.value).subscribe( data=>
      {
        window.alert('Station with ID: ' + data.Id + ' added!');
        this.getStations();
        this.stationForm.reset();
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
    this.findLines();
  }

  findLines(){
    this.menageService.findLines(this.selectedStationId).subscribe(
      data=>{
        this.lines = data;
        console.log(this.lines);
      }
    );
  }


  onClickDelete(){
    this.menageService.deleteStation(this.selectedStationId).subscribe(
      d=>{
        this.getStations();
        window.alert("Successfully deleted station with ID: " + this.selectedStationId);
        this.selectedStationId = "";
        this.stationForm.reset();
      }
    );
  }


  onClickEdit(){
        this.menageService.editStation(this.stationForm.value, this.selectedStationId).subscribe(
          data=>{
            this.getStations();
            window.alert("Successfully edited station with ID: " + this.selectedStationId);
            this.stationForm.reset();
          }
        );
  }


}
