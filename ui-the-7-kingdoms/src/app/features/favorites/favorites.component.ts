import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { CharactersService } from '../../core/services/characters.service';
import { HousesService } from '../../core/services/houses.service';
import { Character } from '../../core/types/characters.model';
import { House } from '../../core/types/houses.model';
import { loadFavorites, removeCharacterFavorite, removeHouseFavorite } from '../../store/favorites/favorites.actions';
import {
  selectFavoriteCharacters,
  selectFavoriteHouses,
  selectFavoritesIsLoading,
} from '../../store/favorites/favorites.selectors';
import { CharacterInfoComponent } from '../shared-components/character-info/character-info.component';
import { HouseInfoComponent } from '../shared-components/house-info/house-info.component';
import { FavCharactersComponent } from './fav-characters/fav-characters.component';
import { FavHousesComponent } from './fav-houses/fav-houses.component';

@Component({
  selector: 'app-favorites',
  imports: [CharacterInfoComponent, HouseInfoComponent, FavCharactersComponent, FavHousesComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly charactersService = inject(CharactersService);
  private readonly housesService = inject(HousesService);

  activeTab = signal<'characters' | 'houses'>('characters');
  selectedCharacter = signal<Character | null>(null);
  selectedHouse = signal<House | null>(null);

  characters = toSignal(this.store.select(selectFavoriteCharacters), { initialValue: [] });
  houses = toSignal(this.store.select(selectFavoriteHouses), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectFavoritesIsLoading), { initialValue: false });

  totalCount = computed(() => this.characters().length + this.houses().length);

  ngOnInit(): void {
    this.store.dispatch(loadFavorites());
  }

  openCharacter(url: string): void {
    const id = Number(url.split('/').pop());
    this.charactersService.getCharacterById(id).subscribe((character) => {
      this.selectedCharacter.set(character);
    });
  }

  openHouse(url: string): void {
    const id = Number(url.split('/').pop());
    this.housesService.getHouseById(id).subscribe((house) => {
      this.selectedHouse.set(house);
    });
  }

  removeCharacter(url: string): void {
    this.store.dispatch(removeCharacterFavorite({ url }));
  }

  removeHouse(url: string): void {
    this.store.dispatch(removeHouseFavorite({ url }));
  }
}
