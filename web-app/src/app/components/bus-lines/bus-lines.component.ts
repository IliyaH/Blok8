import { Component, OnInit } from '@angular/core';
import { MenageService } from 'src/app/services/menage/menage.service';
import { MarkerInfo, Polyline, GeoLocation, Line, Station } from 'src/app/models/models';

@Component({
  selector: 'app-bus-lines',
  templateUrl: './bus-lines.component.html',
  styleUrls: ['./bus-lines.component.css']
})
export class BusLinesComponent implements OnInit {

  constructor(private menageService: MenageService) { }

  lineStationsIds: any[] = [];
  lineStations: Station[] = [];
  lines: Line[] = [];
  stations: Station[] = [];
  markerInfo: MarkerInfo;
  selLine: Polyline;
  iconPath: any = { url:"assets/busicon.png", scaledSize: {width: 35, height: 35}};
  selectedLineId: any ;
  i: number;
  j: number;
  initBool: boolean = true;

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.232268, 19.842954),
    "assets/images/ftn.png",
    "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    this.selLine = new Polyline([], 'red', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.getLines();
  }

  getLines(){
    this.menageService.getLines().subscribe(
      response => {
        this.lines = response;
        if(this.lines.length > 0){
          if(this.initBool === true){
            this.selectedLineId = this.lines[0].Id;
            this.initBool = false;
          }
        }
        this.getStations();
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
          }
        );
      }
    );
  }
      
  onSelectLine(event: any){
    this.selectedLineId = event.target.value;
    this.lineStations = [];
    this.getStations();
    
  }

}
