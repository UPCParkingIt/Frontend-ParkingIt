import { TestBed } from '@angular/core/testing';

import { RecognitionProcessService } from './recognition-process.service';

describe('RecognitionProcessService', () => {
  let service: RecognitionProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecognitionProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
