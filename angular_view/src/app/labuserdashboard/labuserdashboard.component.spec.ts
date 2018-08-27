import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabuserdashboardComponent } from './labuserdashboard.component';

describe('LabuserdashboardComponent', () => {
  let component: LabuserdashboardComponent;
  let fixture: ComponentFixture<LabuserdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabuserdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabuserdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
