import { Component, OnInit } from '@angular/core';
import { Line, Departure } from 'src/app/models/models';
import { TimetableService } from 'src/app/services/timetable/timetable.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})


export class ScheduleComponent implements OnInit {
  
  ngOnInit() {  
  }

  constructor(private timetableService : TimetableService , public router: Router, private fb: FormBuilder,) { }

  Lines : Line[] = [];
  Departures : Departure[] = [];
 
  selectedDayType : any = 'Weekday';
  selectedLineType : any = 'City';
  selectedLineName: any;

  timetableForm = this.fb.group({
    dayType: [''],
    lineType: [''],
    lineName: [''],
  });
  

  getLines(event : any)
  {    
    this.selectedLineType = event.target.value;
    this.timetableService.getLines(this.selectedLineType).subscribe((c: Line[]) => this.Lines = c);
  }

  getTimetable()
  {
    this.selectedDayType = this.timetableForm.controls.dayType.value;
    this.selectedLineType = this.timetableForm.controls.lineType.value;
    this.selectedLineName = this.timetableForm.controls.lineName.value;
    this.timetableService.getSchedule(this.selectedDayType , this.selectedLineType , this.selectedLineName).subscribe((c: Departure[]) => this.Departures = c)
  }

}


