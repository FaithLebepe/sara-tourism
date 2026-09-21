import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTourists } from './admin-tourists';

describe('AdminTourists', () => {
  let component: AdminTourists;
  let fixture: ComponentFixture<AdminTourists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTourists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTourists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
