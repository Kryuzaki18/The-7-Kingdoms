import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesPagination } from './houses-pagination';

describe('HousesPagination', () => {
  let component: HousesPagination;
  let fixture: ComponentFixture<HousesPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(HousesPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
