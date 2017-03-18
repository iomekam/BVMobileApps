import { TestBed, inject } from '@angular/core/testing';

import { AppInfoUpdateServiceService } from './app-info-update-service.service';

describe('AppInfoUpdateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppInfoUpdateServiceService]
    });
  });

  it('should ...', inject([AppInfoUpdateServiceService], (service: AppInfoUpdateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
