import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

import { Character, CharactersFilters } from '../../core/types/characters.model';
import { Layout } from '../../core/types/layout';
import { APP_SETTINGS } from '../../core/constants/app-settings.constant';

import { loadCharacters } from '../../store/characters/characters.actions';
import {
  selectCharacters,
  selectCharactersError,
  selectCharactersHasMore,
  selectCharactersIsLoading,
  selectCharactersPage,
} from '../../store/characters/characters.selectors';
import {
  addCharacterFavorite,
  loadFavorites,
  removeCharacterFavorite,
} from '../../store/favorites/favorites.actions';
import { selectFavoriteCharacterUrls } from '../../store/favorites/favorites.selectors';

import { CharactersFiltersComponent } from './characters-filters/characters-filters.component';
import { CharacterInfoComponent } from '../shared-components/character-info/character-info.component';
import { PageTitleComponent } from '../shared-components/page-title/page-title.component';
import { PagePaginationComponent } from '../shared-components/page-pagination/page-pagination.component';
import { GenericCardComponent } from '../shared-components/generic-card/generic-card.component';

@Component({
  selector: 'app-characters',
  imports: [
    CharactersFiltersComponent,
    CharacterInfoComponent,
    PageTitleComponent,
    PagePaginationComponent,
    GenericCardComponent,
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly scrollEl = inject(DOCUMENT).getElementById('main-scroll');

  characters = toSignal(this.store.select(selectCharacters), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectCharactersIsLoading), { initialValue: false });
  error = toSignal(this.store.select(selectCharactersError), { initialValue: null });
  page = toSignal(this.store.select(selectCharactersPage), { initialValue: 1 });
  hasMore = toSignal(this.store.select(selectCharactersHasMore), { initialValue: false });
  favoriteUrls = toSignal(this.store.select(selectFavoriteCharacterUrls), {
    initialValue: new Set<string>(),
  });

  selectedCharacter = signal<Character | null>(null);
  initialNameFilter = signal('');
  initialGenderFilter = signal('');
  currentPageSize = signal(APP_SETTINGS.pageSize);
  layout = signal<Layout>(APP_SETTINGS.layout);
  showScrollTop = signal(false);

  private readonly nameSearch$ = new Subject<string>();
  private readonly genderChange$ = new Subject<string>();
  private filterInitialized = false;

  readonly skeletonsList = Array.from({ length: 10 }, (_, i) => i);
  readonly skeletonsGrid = Array.from({ length: 20 }, (_, i) => i);

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
          gender: params['gender'] || '',
        })),
        distinctUntilChanged(
          (a, b) =>
            a.page === b.page && a.size === b.size && a.name === b.name && a.gender === b.gender,
        ),
        takeUntilDestroyed(),
      )
      .subscribe(({ page, size, name, gender }) => {
        this.currentPageSize.set(size);

        if (!this.filterInitialized) {
          this.filterInitialized = true;
          this.initialNameFilter.set(name);
          this.initialGenderFilter.set(gender);
        }

        this.store.dispatch(
          loadCharacters({
            page,
            pageSize: size,
            name: name || undefined,
            gender: gender || undefined,
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

    this.genderChange$.pipe(distinctUntilChanged(), takeUntilDestroyed()).subscribe((gender) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: 1, size: this.currentPageSize(), gender: gender || null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
      this.scrollToTop();
    });
  }

  onFiltersChange(filters: CharactersFilters): void {
    this.nameSearch$.next(filters.name);
    this.genderChange$.next(filters.gender);
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

  openCharacter(character: Character): void {
    this.selectedCharacter.set(character);
  }

  closeCharacter(): void {
    this.selectedCharacter.set(null);
  }

  scrollToTop(): void {
    this.scrollEl?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getDisplayName(character: Character): string {
    if (character.name) return character.name;
    const alias = character.aliases.find((a) => a);
    return alias ?? 'Unknown';
  }

  isFavorited(url: string): boolean {
    return this.favoriteUrls().has(url);
  }

  toggleFavorite(event: Event, character: Character): void {
    event.stopPropagation();
    if (this.isFavorited(character.url)) {
      this.store.dispatch(removeCharacterFavorite({ url: character.url }));
    } else {
      const fav = {
        url: character.url,
        name: this.getDisplayName(character),
        culture: character.culture || undefined,
        gender: character.gender || undefined,
      };
      this.store.dispatch(addCharacterFavorite(fav));
    }
  }
}
