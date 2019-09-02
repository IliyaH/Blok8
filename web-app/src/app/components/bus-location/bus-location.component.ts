import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { MarkerInfo, Polyline, Line, Station, GeoLocation } from 'src/app/models/models';
import { MenageService } from 'src/app/services/menage/menage.service';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-bus-location',
  templateUrl: './bus-location.component.html',
  styleUrls: ['./bus-location.component.css']
})
export class BusLocationComponent implements OnInit {

  constructor( private locationService: LocationService, private menageService: MenageService) { }

  @ViewChild('AgmMap') agmMap: AgmMap;  

  /*lines : Line[] = [];
  scheduleForm = this.fb.group({
    selectedDeparture : ['', Validators.required],
    editDeleteDeparture: ['', Validators.required],
    addDeparture: ['', Validators.required],
  });*/

  tempNiz: any[] = [];
  lineStationsIds: any[] = [];
  lineStations: Station[] = [];
  lines: Line[] = [];
  stations: Station[] = [];
  markerInfo: MarkerInfo;
  selLine: Polyline;
  selLineBus: Polyline;
  iconPath: any = { url:"assets/busicon.png", scaledSize: {width: 35, height: 35}};
  iconPathBus: any = { url:"assets/ftn.png", scaledSize: {width: 20, height: 20}};
  selectedLineId: any ;
  i: number;
  j: number;
  initBool: boolean = true;
  BusX: number;
  BusY: number;
  mapZoom = 14;

  isConnected: Boolean;

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.232268, 19.842954),
    "assets/ftn.png",
    "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.selLineBus = new Polyline([], 'red', { url:"assets/ftn.png", scaledSize: {width: 20, height: 20}});
    
    this.checkConnection();
    this.registerForHello();
    this.getLines();
  }

  private checkConnection(){
    this.locationService.startConnection().subscribe(
      e =>{
        this.isConnected = e;
      }
    );
  }

  private registerForHello(){
    this.locationService.registerForHello().subscribe(
      data=>{
        console.log("Cmar");
        this.BusX = data[0];
        this.BusY = data[1];
        
        this.selLineBus = new Polyline([], 'red', { url:"assets/ftn.png", scaledSize: {width: 20, height: 20}});
        this.selLineBus.addLocation(new GeoLocation(this.BusX, this.BusY));
        
      }
    );
  }

  private hello(){
    this.locationService.hello(this.lineStations);
  }

  getLines(){
    this.menageService.getLines().subscribe(
      response => {
        this.lines = response;
        /*if(this.lines.length > 0){
          if(this.initBool === true){
            this.selectedLineId = this.lines[0].Id;
            this.initBool = false;
          }
        }*/
        //this.getStations();
      });
    }

  getStations(){
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.menageService.getStations().subscribe(
      data=>{
        this.stations = data;
        this.menageService.getLineStations(this.selectedLineId).subscribe(
          data=>{
            this.lineStationsIds = data;
            for(this.i = 0; this.i < this.stations.length; this.i++){
              for(this.j = 0; this.j < this.lineStationsIds.length; this.j++){
                if(this.stations[this.i].Id == this.lineStationsIds[this.j]){
                  this.lineStations.push(this.stations[this.i]);
                  this.selLine.addLocation(new GeoLocation(this.stations[this.i].XCoordinate, this.stations[this.i].YCoordinate));
                }
              }
            }
            console.log(this.lineStations.length);
            
            this.locationService.hello(this.lineStations);
          }
        );
      }
    );
  }
      
  onSelectLine(event: any){
    this.selectedLineId = event.target.value;
    this.lineStations = [];
    //this.hello();
    //this.locationService.stop();
    //this.checkConnection();
    this.getStations();
    
  }

  temp(event: any){
    console.log(event);

  }

}
