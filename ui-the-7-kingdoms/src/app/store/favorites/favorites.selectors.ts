import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from '../../core/types/favorites.model';
import { FAVORITES_FEATURE_KEY } from './favorites.reducer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>(FAVORITES_FEATURE_KEY);

export const selectFavoriteCharacters = createSelector(selectFavoritesState, (s) => s.characters);
export const selectFavoriteHouses = createSelector(selectFavoritesState, (s) => s.houses);
export const selectFavoritesIsLoading = createSelector(selectFavoritesState, (s) => s.isLoading);
export const selectFavoritesLoaded = createSelector(selectFavoritesState, (s) => s.loaded);

export const selectFavoriteCharacterUrls = createSelector(
  selectFavoriteCharacters,
  (chars) => new Set(chars.map((c) => c.url)),
);

export const selectFavoriteHouseUrls = createSelector(
  selectFavoriteHouses,
  (houses) => new Set(houses.map((h) => h.url)),
);
