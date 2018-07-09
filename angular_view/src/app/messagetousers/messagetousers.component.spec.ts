import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagetousersComponent } from './messagetousers.component';

describe('MessagetousersComponent', () => {
  let component: MessagetousersComponent;
  let fixture: ComponentFixture<MessagetousersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagetousersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagetousersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
