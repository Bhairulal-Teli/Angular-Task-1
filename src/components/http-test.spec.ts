import { TestBed } from '@angular/core/testing';

import { HttpTest } from './http-test';

describe('HttpTest', () => {
  let service: HttpTest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
