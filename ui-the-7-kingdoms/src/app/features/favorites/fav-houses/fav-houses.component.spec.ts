import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavHousesComponent } from './fav-houses.component';

describe('FavHousesComponent', () => {
  let component: FavHousesComponent;
  let fixture: ComponentFixture<FavHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavHousesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavHousesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
