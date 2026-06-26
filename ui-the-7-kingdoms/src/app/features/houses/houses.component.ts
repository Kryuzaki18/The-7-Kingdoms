import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

import { House, HousesFilters } from '../../core/types/houses.model';
import { loadHouses } from '../../store/houses/houses.actions';
import {
  selectHouses,
  selectHousesError,
  selectHousesHasMore,
  selectHousesIsLoading,
  selectHousesPage,
} from '../../store/houses/houses.selectors';

import { HousesFiltersComponent } from './houses-filters.component/houses-filters.component';
import { HousesPagination } from './houses-pagination/houses-pagination';
import { HouseInfoComponent } from '../shared-components/house-info/house-info.component';

@Component({
  selector: 'app-houses',
  imports: [HousesFiltersComponent, HousesPagination, HouseInfoComponent],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss',
})
export class HousesComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  houses = toSignal(this.store.select(selectHouses), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectHousesIsLoading), { initialValue: false });
  error = toSignal(this.store.select(selectHousesError), { initialValue: null });
  page = toSignal(this.store.select(selectHousesPage), { initialValue: 1 });
  hasMore = toSignal(this.store.select(selectHousesHasMore), { initialValue: false });

  selectedHouse = signal<House | null>(null);
  initialNameFilter = signal('');
  initialRegionFilter = signal('');
  currentPageSize = signal(10);
  regions = signal<string[]>([]);

  readonly skeletons = Array.from({ length: 10 }, (_, i) => i);

  private readonly nameSearch$ = new Subject<string>();
  private readonly regionChange$ = new Subject<string>();
  private filterInitialized = false;

  constructor() {
    this.route.queryParams
      .pipe(
        map((params) => ({
          page: Math.max(1, Number(params['page']) || 1),
          size: Math.min(50, Math.max(1, Number(params['size']) || 10)),
          name: params['name'] || '',
          region: params['region'] || '',
        })),
        distinctUntilChanged(
          (a, b) =>
            a.page === b.page &&
            a.size === b.size &&
            a.name === b.name &&
            a.region === b.region,
        ),
        takeUntilDestroyed(),
      )
      .subscribe(({ page, size, name, region }) => {
        this.currentPageSize.set(size);

        if (!this.filterInitialized) {
          this.filterInitialized = true;
          this.initialNameFilter.set(name);
          this.initialRegionFilter.set(region);
        }

        this.store.dispatch(
          loadHouses({ page, pageSize: size, name: name || undefined, region: region || undefined }),
        );

        const current = this.route.snapshot.queryParams;
        if (!current['page'] || !current['size']) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page, size },
            replaceUrl: true,
          });
        }
      });

    this.nameSearch$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((name) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: 1, size: this.currentPageSize(), name: name || null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

    this.regionChange$
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((region) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: 1, size: this.currentPageSize(), region: region || null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

    this.store.select(selectHouses).subscribe((houses) => {
      if (!houses.length) return;
      const newRegions = houses.map((h) => h.region).filter((h) => !!h);
      this.regions.update((existing) => [...new Set([...existing, ...newRegions])]);
      console.log(this.regions());
    });
  }

  onFiltersChange(filters: HousesFilters): void {
    this.nameSearch$.next(filters.name);
    this.regionChange$.next(filters.region);
  }

  onPageChange(newPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage, size: this.currentPageSize() },
      queryParamsHandling: 'merge',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPageSizeChange(size: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1, size },
      queryParamsHandling: 'merge',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openHouse(house: House): void {
    this.selectedHouse.set(house);
  }

  closeHouse(): void {
    this.selectedHouse.set(null);
  }
}
