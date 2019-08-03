import { TestBed } from '@angular/core/testing';

import { DashboardService } from './test-code-multisize/test-code-multisize-dashboard/dashboard.service';

describe('DashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });
});
