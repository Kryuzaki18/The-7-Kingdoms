import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

import { House, HousesFilters } from '../../core/types/houses.model';
import { Layout } from '../../core/types/layout';
import { APP_SETTINGS } from '../../core/constants/app-settings.constant';

import { loadHouses } from '../../store/houses/houses.actions';
import {
  selectHouses,
  selectHousesError,
  selectHousesHasMore,
  selectHousesIsLoading,
  selectHousesPage,
} from '../../store/houses/houses.selectors';
import {
  addHouseFavorite,
  loadFavorites,
  removeHouseFavorite,
} from '../../store/favorites/favorites.actions';
import { selectFavoriteHouseUrls } from '../../store/favorites/favorites.selectors';

import { HousesFiltersComponent } from './houses-filters.component/houses-filters.component';
import { HouseInfoComponent } from '../shared-components/house-info/house-info.component';
import { PageTitleComponent } from '../shared-components/page-title/page-title.component';
import { PagePaginationComponent } from '../shared-components/page-pagination/page-pagination.component';
import { GenericCardComponent } from '../shared-components/generic-card/generic-card.component';

@Component({
  selector: 'app-houses',
  imports: [
    HousesFiltersComponent,
    HouseInfoComponent,
    PageTitleComponent,
    PagePaginationComponent,
    GenericCardComponent,
  ],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss',
})
export class HousesComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly scrollEl = inject(DOCUMENT).getElementById('main-scroll');

  houses = toSignal(this.store.select(selectHouses), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectHousesIsLoading), { initialValue: false });
  error = toSignal(this.store.select(selectHousesError), { initialValue: null });
  page = toSignal(this.store.select(selectHousesPage), { initialValue: 1 });
  hasMore = toSignal(this.store.select(selectHousesHasMore), { initialValue: false });
  favoriteUrls = toSignal(this.store.select(selectFavoriteHouseUrls), {
    initialValue: new Set<string>(),
  });

  selectedHouse = signal<House | null>(null);
  initialNameFilter = signal('');
  initialRegionFilter = signal('');
  currentPageSize = signal(APP_SETTINGS.pageSize);
  layout = signal<Layout>(APP_SETTINGS.layout);
  showScrollTop = signal(false);

  readonly skeletonsList = Array.from({ length: 10 }, (_, i) => i);
  readonly skeletonsGrid = Array.from({ length: 20 }, (_, i) => i);

  private readonly nameSearch$ = new Subject<string>();
  private readonly regionChange$ = new Subject<string>();
  private filterInitialized = false;

  constructor() {
    this.store.dispatch(loadFavorites());

    if (this.scrollEl) {
      fromEvent(this.scrollEl, 'scroll')
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          this.showScrollTop.set(this.scrollEl!.scrollTop > 300);
        });
    }

    this.route.queryParams
      .pipe(
        map((params) => ({
          page: Math.max(1, Number(params['page']) || 1),
          size: Math.min(50, Math.max(1, Number(params['size']) || APP_SETTINGS.pageSize)),
          name: params['name'] || '',
          region: params['region'] || '',
        })),
        distinctUntilChanged(
          (a, b) =>
            a.page === b.page && a.size === b.size && a.name === b.name && a.region === b.region,
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
          loadHouses({
            page,
            pageSize: size,
            name: name || undefined,
            region: region || undefined,
          }),
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
        this.scrollToTop();
      });

    this.regionChange$.pipe(distinctUntilChanged(), takeUntilDestroyed()).subscribe((region) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: 1, size: this.currentPageSize(), region: region || null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
      this.scrollToTop();
    });
  }

  onFiltersChange(filters: HousesFilters): void {
    this.nameSearch$.next(filters.name);
    this.regionChange$.next(filters.region);
  }

  onLayoutChange(value: Layout): void {
    this.layout.set(value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1, size: value === APP_SETTINGS.layout ? APP_SETTINGS.pageSize : 10 },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.scrollToTop();
  }

  onPageChange(newPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage, size: this.currentPageSize() },
      queryParamsHandling: 'merge',
    });
    this.scrollToTop();
  }

  onPageSizeChange(size: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1, size },
      queryParamsHandling: 'merge',
    });
    this.scrollToTop();
  }

  scrollToTop(): void {
    this.scrollEl?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openHouse(house: House): void {
    this.selectedHouse.set(house);
  }

  closeHouse(): void {
    this.selectedHouse.set(null);
  }

  isFavorited(url: string): boolean {
    return this.favoriteUrls().has(url);
  }

  toggleFavorite(event: Event, house: House): void {
    event.stopPropagation();
    if (this.isFavorited(house.url)) {
      this.store.dispatch(removeHouseFavorite({ url: house.url }));
    } else {
      this.store.dispatch(
        addHouseFavorite({
          url: house.url,
          name: house.name || 'Unknown House',
          region: house.region || undefined,
        }),
      );
    }
  }
}
