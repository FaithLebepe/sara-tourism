import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTourguides } from './admin-tourguides';

describe('AdminTourguides', () => {
  let component: AdminTourguides;
  let fixture: ComponentFixture<AdminTourguides>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTourguides]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTourguides);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
