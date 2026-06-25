import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

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
export class CharactersComponent implements OnInit {
  private readonly store = inject(Store);

  characters = toSignal(this.store.select(selectCharacters), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectCharactersIsLoading), { initialValue: false });
  error = toSignal(this.store.select(selectCharactersError), { initialValue: null });
  page = toSignal(this.store.select(selectCharactersPage), { initialValue: 1 });
  hasMore = toSignal(this.store.select(selectCharactersHasMore), { initialValue: false });

  selectedCharacter = signal<Character | null>(null);
  nameFilter = signal('');
  genderFilter = signal('');

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

  ngOnInit(): void {
    this.store.dispatch(loadCharacters({ page: 1 }));
  }

  onFiltersChange(filters: CharacterFilters): void {
    this.nameFilter.set(filters.name);
    this.genderFilter.set(filters.gender);
  }

  onPageChange(page: number): void {
    this.store.dispatch(loadCharacters({ page }));
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
