import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordNewpasswordComponent } from './resetpassword-newpassword.component';

describe('ResetpasswordNewpasswordComponent', () => {
  let component: ResetpasswordNewpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordNewpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordNewpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordNewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
