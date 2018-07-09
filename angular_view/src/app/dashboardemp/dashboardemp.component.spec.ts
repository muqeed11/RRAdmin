import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardempComponent } from './dashboardemp.component';

describe('DashboardempComponent', () => {
  let component: DashboardempComponent;
  let fixture: ComponentFixture<DashboardempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
