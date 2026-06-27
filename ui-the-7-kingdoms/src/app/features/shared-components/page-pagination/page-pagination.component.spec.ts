import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePaginationComponent } from './page-pagination.component';

describe('PagePaginationComponent', () => {
  let component: PagePaginationComponent;
  let fixture: ComponentFixture<PagePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagePaginationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
