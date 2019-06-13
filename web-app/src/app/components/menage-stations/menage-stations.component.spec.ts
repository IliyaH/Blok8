import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageStationsComponent } from './menage-stations.component';

describe('MenageStationsComponent', () => {
  let component: MenageStationsComponent;
  let fixture: ComponentFixture<MenageStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
