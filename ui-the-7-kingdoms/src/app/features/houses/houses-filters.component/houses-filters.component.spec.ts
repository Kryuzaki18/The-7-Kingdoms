import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesFiltersComponent } from './houses-filters.component';

describe('HousesFiltersComponent', () => {
  let component: HousesFiltersComponent;
  let fixture: ComponentFixture<HousesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HousesFiltersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
