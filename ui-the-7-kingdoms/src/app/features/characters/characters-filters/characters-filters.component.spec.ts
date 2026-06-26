import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersFiltersComponent } from './characters-filters.component';

describe('CharacterFiltersComponent', () => {
  let component: CharactersFiltersComponent;
  let fixture: ComponentFixture<CharactersFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersFiltersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
