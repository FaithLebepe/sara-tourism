import { TestBed } from '@angular/core/testing';

import { AdminActivity } from './admin-activity';

describe('AdminActivity', () => {
  let service: AdminActivity;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminActivity);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
