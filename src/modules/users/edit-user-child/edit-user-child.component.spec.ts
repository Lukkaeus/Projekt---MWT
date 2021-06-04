import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserChildComponent } from './edit-user-child.component';

describe('EditUserChildComponent', () => {
  let component: EditUserChildComponent;
  let fixture: ComponentFixture<EditUserChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
