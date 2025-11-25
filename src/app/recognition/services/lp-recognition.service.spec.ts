import { TestBed } from '@angular/core/testing';

import { LpRecognitionService } from './lp-recognition.service';

describe('LpRecognitionService', () => {
  let service: LpRecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LpRecognitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
