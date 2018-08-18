import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeownpwdComponent } from './changeownpwd.component';

describe('ChangeownpwdComponent', () => {
  let component: ChangeownpwdComponent;
  let fixture: ComponentFixture<ChangeownpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeownpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeownpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
