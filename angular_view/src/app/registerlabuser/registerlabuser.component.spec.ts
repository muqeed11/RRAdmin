import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterlabuserComponent } from './registerlabuser.component';

describe('RegisterlabuserComponent', () => {
  let component: RegisterlabuserComponent;
  let fixture: ComponentFixture<RegisterlabuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterlabuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterlabuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
