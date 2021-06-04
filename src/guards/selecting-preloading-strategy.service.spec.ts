import { TestBed } from '@angular/core/testing';

import { SelectingPreloadingStrategyService } from './selecting-preloading-strategy.service';

describe('SelectingPreloadingStrategyService', () => {
  let service: SelectingPreloadingStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectingPreloadingStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
