import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationErrorModalComponent } from './reservation-error-modal.component';

describe('ReservationErrorModalComponent', () => {
  let component: ReservationErrorModalComponent;
  let fixture: ComponentFixture<ReservationErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationErrorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
