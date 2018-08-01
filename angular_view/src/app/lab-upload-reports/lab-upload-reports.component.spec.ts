import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabUploadReportsComponent } from './lab-upload-reports.component';

describe('LabUploadReportsComponent', () => {
  let component: LabUploadReportsComponent;
  let fixture: ComponentFixture<LabUploadReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabUploadReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabUploadReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
