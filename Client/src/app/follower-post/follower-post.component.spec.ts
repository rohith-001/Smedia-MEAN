import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerPostComponent } from './follower-post.component';

describe('FollowerPostComponent', () => {
  let component: FollowerPostComponent;
  let fixture: ComponentFixture<FollowerPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowerPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
