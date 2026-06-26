import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { loadFavorites, removeCharacterFavorite, removeHouseFavorite } from '../../store/favorites/favorites.actions';
import {
  selectFavoriteCharacters,
  selectFavoriteHouses,
  selectFavoritesIsLoading,
} from '../../store/favorites/favorites.selectors';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private readonly store = inject(Store);

  activeTab = signal<'characters' | 'houses'>('characters');

  characters = toSignal(this.store.select(selectFavoriteCharacters), { initialValue: [] });
  houses = toSignal(this.store.select(selectFavoriteHouses), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectFavoritesIsLoading), { initialValue: false });

  totalCount = computed(() => this.characters().length + this.houses().length);

  ngOnInit(): void {
    this.store.dispatch(loadFavorites());
  }

  removeCharacter(url: string): void {
    this.store.dispatch(removeCharacterFavorite({ url }));
  }

  removeHouse(url: string): void {
    this.store.dispatch(removeHouseFavorite({ url }));
  }
}
