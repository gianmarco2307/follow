import { TestBed } from '@angular/core/testing';

import { DisserviziService } from './disservizi.service';

describe('DisserviziService', () => {
  let service: DisserviziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisserviziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
