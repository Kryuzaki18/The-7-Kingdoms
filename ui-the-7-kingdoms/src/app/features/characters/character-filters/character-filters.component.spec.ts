import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFiltersComponent } from './character-filters.component';

describe('CharacterFiltersComponent', () => {
  let component: CharacterFiltersComponent;
  let fixture: ComponentFixture<CharacterFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterFiltersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
