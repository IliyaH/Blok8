import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Line, Station } from 'src/app/models/models';
import { MenageService } from 'src/app/services/menage/menage.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {

  lineForm = this.fb.group({
    lineName: ['', Validators.required],
    lineType: ['', Validators.required],
    
  });

  lines : Line[] = [];
  selectedLineId : any;
  selectedLineType: any;
  i: number;
  j: number;
  allStations : Station[] = [];
  stationsIds: any[] = [];
  lineStationsIds: any[] = [];

  constructor(private fb: FormBuilder, private menageService: MenageService) { }

  ngOnInit() {
    this.selectedLineId = "Add Line";
    this.getLines();
    this.getAllStations();

  }

  onSelectLine(event: any){
    this.selectedLineId = event.target.value;
    
    for(this.i = 0; this.i < this.lines.length; this.i++){
      if(this.lines[this.i].Id == this.selectedLineId){
        this.lineForm.controls.lineName.setValue(this.lines[this.i].LineName);
        this.lineForm.controls.lineType.setValue(this.lines[this.i].LineType);
      }
    }
    if(this.selectedLineId != "Add Line"){
    
      this.menageService.getLineStations(this.selectedLineId).subscribe(
        data =>{
          this.lineStationsIds = data;
  
          for(this.i = 0; this.i < this.allStations.length; this.i++){
            this.allStations[this.i].Exist = false;
            for(this.j = 0; this.j < data.length; this.j++){
              if(this.allStations[this.i].Id == data[this.j]){
                this.allStations[this.i].Exist = true;
                break;
              }
            }
          }
          }
        
      );
    }
    
    
    if(this.selectedLineId == "Add Line"){
      for(this.i = 0; this.i < this.allStations.length; this.i++){
        this.allStations[this.i].Exist = false;
      }
      this.lineForm.reset();
    }
    
  
    
  }

  
  addLine(){
    this.menageService.addLine(this.lineStationsIds, this.lineForm.controls.lineName.value, this.lineForm.controls.lineType.value).subscribe(
      data=>{
        this.getLines();
        this.lineForm.reset();
        this.getAllStations();

        for(this.i = 0; this.i < this.allStations.length; this.i++){
          this.allStations[this.i].Exist = false;
        }
      }
    );
  }

  onClickEdit(){
    this.menageService.editLine(this.lineForm.controls.lineName.value, this.lineForm.controls.lineType.value, this.selectedLineId, this.lineStationsIds).subscribe(
      data=>{
        this.getLines();
        this.lineForm.reset();
        this.getAllStations();
        for(this.i = 0; this.i < this.allStations.length; this.i++){
          this.allStations[this.i].Exist = false;
        }
        window.alert("Successfully edited line with ID: " + this.selectedLineId);
      }
    );
  }

  onClickDelete(){
    this.menageService.deleteLine(this.selectedLineId).subscribe(
      data=>{
        this.getLines();
        this.getAllStations();

        this.selectedLineId = "Add Line";
        this.lineForm.reset();
        for(this.i = 0; this.i < this.allStations.length; this.i++){
          this.allStations[this.i].Exist = false;
        }
        window.alert("Successfully deleted line with ID: " + this.selectedLineId);
      }
    );
  }

  getLines(){
    this.menageService.getLines().subscribe(
      data=>{
        this.lines = data;
      }
    );
  }

  getAllStations(){
    this.menageService.getStations().subscribe(
      data=>{
        this.allStations = data;
      }
    );
  }

  checkValue(event: any, id: any){
    if(event.currentTarget.checked){
      this.lineStationsIds.push(id);
    }
    else{
      for(this. i = 0; this.i < this.lineStationsIds.length; this.i++){
        if(this.lineStationsIds[this.i] == id){
          this.lineStationsIds = this.lineStationsIds.filter(s => s != id);
        }
      }
    }
  }

}
