import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MkSubjectComponent } from './mk-subject.component';

describe('MkSubjectComponent', () => {
  let component: MkSubjectComponent;
  let fixture: ComponentFixture<MkSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MkSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MkSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
