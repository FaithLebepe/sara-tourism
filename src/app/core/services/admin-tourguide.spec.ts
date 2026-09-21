import { TestBed } from '@angular/core/testing';

import { AdminTourguide } from './admin-tourguide';

describe('AdminTourguide', () => {
  let service: AdminTourguide;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTourguide);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
