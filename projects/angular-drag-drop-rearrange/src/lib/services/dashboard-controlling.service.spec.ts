import { TestBed } from '@angular/core/testing';

import { DashboardControllingService } from './dashboard-controlling.service';

describe('DashboardControllingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardControllingService = TestBed.get(DashboardControllingService);
    expect(service).toBeTruthy();
  });
});
