import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsMenuComponent } from './films-menu.component';

describe('FilmsMenuComponent', () => {
  let component: FilmsMenuComponent;
  let fixture: ComponentFixture<FilmsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
