import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersPaginationComponent } from './characters-pagination.component';

describe('CharactersPaginationComponent', () => {
  let component: CharactersPaginationComponent;
  let fixture: ComponentFixture<CharactersPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersPaginationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
