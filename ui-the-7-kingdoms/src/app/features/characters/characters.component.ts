import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

import { Character, CharactersFilters } from '../../core/types/characters.model';
import { loadCharacters } from '../../store/characters/characters.actions';
import {
  selectCharacters,
  selectCharactersError,
  selectCharactersHasMore,
  selectCharactersIsLoading,
  selectCharactersPage,
} from '../../store/characters/characters.selectors';

import { CharactersFiltersComponent } from './characters-filters/characters-filters.component';
import { CharactersPaginationComponent } from './characters-pagination/characters-pagination.component';
import { CharacterInfoComponent } from '../shared-components/character-info/character-info.component';

@Component({
  selector: 'app-characters',
  imports: [CharactersFiltersComponent, CharactersPaginationComponent, CharacterInfoComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  characters = toSignal(this.store.select(selectCharacters), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectCharactersIsLoading), { initialValue: false });
  error = toSignal(this.store.select(selectCharactersError), { initialValue: null });
  page = toSignal(this.store.select(selectCharactersPage), { initialValue: 1 });
  hasMore = toSignal(this.store.select(selectCharactersHasMore), { initialValue: false });

  selectedCharacter = signal<Character | null>(null);
  initialNameFilter = signal('');
  genderFilter = signal('');
  currentPageSize = signal(10);

  private readonly nameSearch$ = new Subject<string>();
  private filterInitialized = false;

  readonly skeletons = Array.from({ length: 10 }, (_, i) => i);

  filteredCharacters = computed(() => {
    const list = this.characters();
    const gender = this.genderFilter();

    if (!gender) return list;
    return list.filter((c) =>
      gender === 'Unknown' ? !c.gender : c.gender === gender,
    );
  });

  constructor() {
    this.route.queryParams
      .pipe(
        map((params) => ({
          page: Math.max(1, Number(params['page']) || 1),
          size: Math.min(50, Math.max(1, Number(params['size']) || 10)),
          name: params['name'] || '',
        })),
        distinctUntilChanged((a, b) => a.page === b.page && a.size === b.size && a.name === b.name),
        takeUntilDestroyed(),
      )
      .subscribe(({ page, size, name }) => {
        this.currentPageSize.set(size);

        if (!this.filterInitialized) {
          this.filterInitialized = true;
          this.initialNameFilter.set(name);
        }

        this.store.dispatch(loadCharacters({ page, pageSize: size, name: name || undefined }));

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
  }

  onFiltersChange(filters: CharactersFilters): void {
    this.genderFilter.set(filters.gender);
    this.nameSearch$.next(filters.name);
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

  openCharacter(character: Character): void {
    this.selectedCharacter.set(character);
  }

  closeCharacter(): void {
    this.selectedCharacter.set(null);
  }

  getDisplayName(character: Character): string {
    if (character.name) return character.name;
    const alias = character.aliases.find((a) => a);
    return alias ?? 'Unknown';
  }
}
