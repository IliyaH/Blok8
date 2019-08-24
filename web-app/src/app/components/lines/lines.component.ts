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
  allStations : Station[] = [];
  stationsIds: any[] = [];

  constructor(private fb: FormBuilder, private menageService: MenageService) { }

  ngOnInit() {
    this.selectedLineId = "Add Line";
    this.getLines();
    this.getAllStations();
  }

  onSelectLine(event: any){
    this.selectedLineId = event.target.value;
    console.log(this.selectedLineId);
    for(this.i = 0; this.i < this.lines.length; this.i++){
      if(this.lines[this.i].Id == this.selectedLineId){
        this.lineForm.controls.lineName.setValue(this.lines[this.i].LineName);
        this.lineForm.controls.lineType.setValue(this.lines[this.i].LineType);
      }
    }
    if(this.selectedLineId == "Add Line"){
      this.lineForm.reset();
    }
    
  
    
  }

  onSelectLineType(event: any){

  }

  addLine(){
    this.menageService.addLine(this.stationsIds, this.lineForm.controls.lineName.value, this.lineForm.controls.lineType.value).subscribe(
      data=>{
        console.log("UDJOH U ADD LINE!");
        //window.alert('Line with ID: ' + data.Id + ' added!');
        this.getLines();
        this.lineForm.reset();
      }
    );
  }

  onClickEdit(){
    console.log("UDJOH U EDIT!");
    this.menageService.editLine(this.lineForm.value, this.selectedLineId).subscribe(
      data=>{
        this.getLines();
        window.alert("Successfully edited line with ID: " + this.selectedLineId);
        this.lineForm.reset();
      }
    );
  }

  onClickDelete(){
    this.menageService.deleteLine(this.selectedLineId).subscribe(
      data=>{
        console.log(data);
        this.getLines();
        window.alert("Successfully deleted line with ID: " + this.selectedLineId);
        this.selectedLineId = "Add Line";
        this.lineForm.reset();
      }
    );
  }

  getLines(){
    this.menageService.getLines().subscribe(
      data=>{
        this.lines = data;
        console.log(this.lines);
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
    console.log(id);
    console.log(event.currentTarget.checked);
    if(event.currentTarget.checked){
      this.stationsIds.push(id);
    }
    else{
      for(this. i = 0; this.i < this.stationsIds.length; this.i++){
        if(this.stationsIds[this.i] == id){
          this.stationsIds = this.stationsIds.filter(s => s != id);
        }
      }
    }
    console.log(this.stationsIds);
  }

}
