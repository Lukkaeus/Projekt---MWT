import { TestBed } from '@angular/core/testing';

import { FilmsServerService } from './films-server.service';

describe('FilmsServerService', () => {
  let service: FilmsServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmsServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
