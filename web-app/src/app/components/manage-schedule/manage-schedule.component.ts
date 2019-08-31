import { Component, OnInit } from '@angular/core';
import { Line, Departure } from 'src/app/models/models';
import { MenageService } from 'src/app/services/menage/menage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TimetableService } from 'src/app/services/timetable/timetable.service';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit {

  lines : Line[] = [];
  scheduleForm = this.fb.group({
    selectedDeparture : ['', Validators.required],
    editDeleteDeparture: ['', Validators.required],
    addDeparture: ['', Validators.required],
  });
  Departures : Departure[] = [];
  selectedDayType: any = "";
  selectedLineType: any = "";
  i: number;
  selectedLineName: any = "";
  selectedDeparture: any = "";
  selectedLineId: any;
  selectedDepartureId: any;
  editDeleteDeparture: any;

  constructor(private menageService: MenageService, private fb: FormBuilder, private timetableService : TimetableService) { }

  ngOnInit() {
    this.getLines();
    
  }

  getLines(){
    this.menageService.getLines().subscribe(
      data=>{
        this.lines = data;
        if(this.lines.length > 0){
          this.selectedLineId = this.lines[0].Id;
          this.selectedLineName = this.lines[0].LineName;
          this.selectedLineType = this.lines[0].LineType;
          this.selectedDayType = "Weekday";
          this.getDepartures();
        }
      }
    );
  }

  getDepartures(){
    this.timetableService.getSchedule(this.selectedDayType, this.selectedLineType, this.selectedLineName).subscribe(
      data =>{
        this.Departures = data;
      }
    );

  }

  onSelectLine(event: any){
    this.selectedLineId = event.target.value;
    for(this.i = 0; this.i < this.lines.length; this.i++){
      if(this.lines[this.i].Id == event.target.value){
        this.selectedLineType = this.lines[this.i].LineType;
        this.selectedLineName = this.lines[this.i].LineName;
      }
    }

    if(this.selectedDayType !== "" && this.selectedLineName !== "" && this.selectedLineType !==""){
      this.getDepartures();
    }
  }

  onSelectDayType(event: any){
    this.selectedDayType = event.target.value;
    if(this.selectedDayType !== "" && this.selectedLineName !== "" && this.selectedLineType !==""){
      this.getDepartures();
    }
  }

  onSelectDeparture(event: any){
    this.selectedDepartureId = event.target.value;
    for(this.i = 0; this.i < this.Departures.length; this.i++){
      if(this.Departures[this.i].Id == event.target.value){
        this.selectedDeparture = this.Departures[this.i].Departures;
        this.scheduleForm.controls.editDeleteDeparture.setValue(this.Departures[this.i].Departures);
      }
    }
  }

  onClickEdit(){
    this.menageService.editDeparture(this.selectedDepartureId, this.scheduleForm.controls.editDeleteDeparture.value).subscribe(
      data =>{
        this.getDepartures();
        this.scheduleForm.reset();
      }
    );
  }

  onClickDelete(){
    this.menageService.deleteDeparture(this.selectedDepartureId).subscribe(
      data =>{
        this.getDepartures();
        this.scheduleForm.reset();
      }
    );
  }

  onClickAdd(){
    this.menageService.addDepartures(this.selectedLineId, this.selectedDayType, this.scheduleForm.controls.addDeparture.value).subscribe(
      data =>{
        this.getDepartures();
        this.scheduleForm.reset();
      }
    );
  }

}
