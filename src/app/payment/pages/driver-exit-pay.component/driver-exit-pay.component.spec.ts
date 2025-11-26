import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverExitPayComponent } from './driver-exit-pay.component';

describe('DriverExitPayComponent', () => {
  let component: DriverExitPayComponent;
  let fixture: ComponentFixture<DriverExitPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverExitPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverExitPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
