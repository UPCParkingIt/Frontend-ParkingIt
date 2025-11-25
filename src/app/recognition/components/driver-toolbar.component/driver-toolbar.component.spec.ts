import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverToolbarComponent } from './driver-toolbar.component';

describe('DriverToolbarComponent', () => {
  let component: DriverToolbarComponent;
  let fixture: ComponentFixture<DriverToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
