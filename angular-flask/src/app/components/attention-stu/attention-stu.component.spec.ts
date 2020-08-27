import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionStuComponent } from './attention-stu.component';

describe('AttentionStuComponent', () => {
  let component: AttentionStuComponent;
  let fixture: ComponentFixture<AttentionStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttentionStuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
