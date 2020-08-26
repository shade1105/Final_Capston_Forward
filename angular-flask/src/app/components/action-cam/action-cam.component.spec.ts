import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCamComponent } from './action-cam.component';

describe('ActionCamComponent', () => {
  let component: ActionCamComponent;
  let fixture: ComponentFixture<ActionCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
