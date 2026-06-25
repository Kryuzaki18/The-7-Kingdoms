import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs';

import { Character, CharacterFilters } from '../../core/types/characters.model';
import { loadCharacters } from '../../store/characters/characters.actions';
import {
  selectCharacters,
  selectCharactersError,
  selectCharactersHasMore,
  selectCharactersIsLoading,
  selectCharactersPage,
} from '../../store/characters/characters.selectors';

import { CharacterFiltersComponent } from './character-filters/character-filters.component';
import { CharactersPaginationComponent } from './characters-pagination/characters-pagination.component';
import { CharacterInfoComponent } from '../shared-components/character-info/character-info.component';

@Component({
  selector: 'app-characters',
  imports: [CharacterFiltersComponent, CharactersPaginationComponent, CharacterInfoComponent],
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
  nameFilter = signal('');
  genderFilter = signal('');
  currentPageSize = signal(10);

  readonly skeletons = Array.from({ length: 10 }, (_, i) => i);

  filteredCharacters = computed(() => {
    const list = this.characters();
    const name = this.nameFilter().toLowerCase().trim();
    const gender = this.genderFilter();

    return list.filter((c) => {
      const displayName = c.name || c.aliases[0] || '';
      const matchesName =
        !name ||
        displayName.toLowerCase().includes(name) ||
        c.aliases.some((a) => a.toLowerCase().includes(name));
      const matchesGender = !gender || (gender === 'Unknown' ? !c.gender : c.gender === gender);
      return matchesName && matchesGender;
    });
  });

  constructor() {
    this.route.queryParams
      .pipe(
        map((params) => ({
          page: Math.max(1, Number(params['page']) || 1),
          size: Math.min(50, Math.max(1, Number(params['size']) || 10)),
        })),
        distinctUntilChanged((a, b) => a.page === b.page && a.size === b.size),
        takeUntilDestroyed(),
      )
      .subscribe(({ page, size }) => {
        this.currentPageSize.set(size);
        this.store.dispatch(loadCharacters({ page, pageSize: size }));

        const current = this.route.snapshot.queryParams;
        if (!current['page'] || !current['size']) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page, size },
            replaceUrl: true,
          });
        }
      });
  }

  onFiltersChange(filters: CharacterFilters): void {
    this.nameFilter.set(filters.name);
    this.genderFilter.set(filters.gender);
  }

  onPageChange(newPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage, size: this.currentPageSize() },
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
