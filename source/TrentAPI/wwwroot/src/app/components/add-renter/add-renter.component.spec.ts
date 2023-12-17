import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRenterComponent } from './add-renter.component';

describe('AddRenterComponent', () => {
  let component: AddRenterComponent;
  let fixture: ComponentFixture<AddRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
