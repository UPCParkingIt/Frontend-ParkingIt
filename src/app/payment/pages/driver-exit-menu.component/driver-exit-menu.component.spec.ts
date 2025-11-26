import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverExitMenuComponent } from './driver-exit-menu.component';

describe('DriverExitMenuComponent', () => {
  let component: DriverExitMenuComponent;
  let fixture: ComponentFixture<DriverExitMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverExitMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverExitMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
