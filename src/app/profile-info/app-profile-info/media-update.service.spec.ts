import { TestBed, inject } from '@angular/core/testing';

import { MediaUpdateService } from './media-update.service';

describe('MediaUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaUpdateService]
    });
  });

  it('should ...', inject([MediaUpdateService], (service: MediaUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
