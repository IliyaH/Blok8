import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MenageService } from 'src/app/services/menage/menage.service';
import { Station, Line, MarkerInfo, Polyline, GeoLocation } from 'src/app/models/models';

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
  markerInfo: MarkerInfo;
  selLine: Polyline;
  clicked: boolean = false;

  constructor(private fb: FormBuilder, private menageService: MenageService) { }

  ngOnInit() {
    this.getStations();
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/images/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selLine = new Polyline([], 'red', { url:"assets/images/autobus.png", scaledSize: {width: 50, height: 50}});
  
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
    this.clicked = true;
    this.selectedStationId = event.target.value;
    this.menageService.getStation(this.selectedStationId).subscribe(data=>{
      this.stationForm.controls.name.setValue(data.Name);
      this.stationForm.controls.address.setValue(data.Address);
      this.stationForm.controls.xCoordinate.setValue(data.XCoordinate);
      this.stationForm.controls.yCoordinate.setValue(data.YCoordinate);
    });
    this.lines = [];
    if(this.selectedStationId)
    {
      this.findLines();
    }
  }

  findLines(){
    this.menageService.findLines(this.selectedStationId).subscribe(
      data=>{
        this.lines = data;
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
        this.clicked = false;
      }
    );
  }


  onClickEdit(){
        this.menageService.editStation(this.stationForm.value, this.selectedStationId).subscribe(
          data=>{
            this.getStations();
            window.alert("Successfully edited station with ID: " + this.selectedStationId);
            this.stationForm.reset();
            this.clicked = false;
          }
        );
  }

  MapClicked(event: any)
  {
    this.clicked = true;
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.selLine.addLocation(new GeoLocation(event.coords.lng, event.coords.lat));
    this.stationForm.controls.xCoordinate.setValue(event.coords.lat);
    this.stationForm.controls.yCoordinate.setValue(event.coords.lng);
  }


}
