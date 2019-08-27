import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePricelistComponent } from './manage-pricelist.component';

describe('ManagePricelistComponent', () => {
  let component: ManagePricelistComponent;
  let fixture: ComponentFixture<ManagePricelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePricelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
