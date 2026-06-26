import { createReducer, on } from '@ngrx/store';
import { FavoritesState } from '../../core/types/favorites.model';
import * as FavoritesActions from './favorites.actions';

export const FAVORITES_FEATURE_KEY = 'favorites';

const initialState: FavoritesState = {
  characters: [],
  houses: [],
  isLoading: false,
  loaded: false,
  error: null,
};

export const favoritesReducer = createReducer(
  initialState,

  on(FavoritesActions.loadFavorites, (state) => ({ ...state, isLoading: true, error: null })),
  on(FavoritesActions.loadFavoritesSuccess, (state, { characters, houses }) => ({
    ...state, characters, houses, isLoading: false, loaded: true, error: null,
  })),
  on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
    ...state, isLoading: false, error,
  })),

  on(FavoritesActions.addCharacterFavoriteSuccess, (state, { characters }) => ({ ...state, characters })),
  on(FavoritesActions.removeCharacterFavoriteSuccess, (state, { characters }) => ({ ...state, characters })),
  on(FavoritesActions.addHouseFavoriteSuccess, (state, { houses }) => ({ ...state, houses })),
  on(FavoritesActions.removeHouseFavoriteSuccess, (state, { houses }) => ({ ...state, houses })),
);
