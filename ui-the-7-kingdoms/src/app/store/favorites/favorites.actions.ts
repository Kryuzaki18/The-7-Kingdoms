import { createAction, props } from '@ngrx/store';
import { FavoritesResponse } from '../../core/types/favorites.model';

export const loadFavorites = createAction('[Favorites] Load');
export const loadFavoritesSuccess = createAction('[Favorites] Load Success', props<FavoritesResponse>());
export const loadFavoritesFailure = createAction('[Favorites] Load Failure', props<{ error: string }>());

export const addCharacterFavorite = createAction('[Favorites] Add Character', props<{ url: string; name: string; culture?: string; gender?: string }>());
export const addCharacterFavoriteSuccess = createAction('[Favorites] Add Character Success', props<FavoritesResponse>());
export const addCharacterFavoriteFailure = createAction('[Favorites] Add Character Failure', props<{ error: string }>());

export const removeCharacterFavorite = createAction('[Favorites] Remove Character', props<{ url: string }>());
export const removeCharacterFavoriteSuccess = createAction('[Favorites] Remove Character Success', props<FavoritesResponse>());
export const removeCharacterFavoriteFailure = createAction('[Favorites] Remove Character Failure', props<{ error: string }>());

export const addHouseFavorite = createAction('[Favorites] Add House', props<{ url: string; name: string; region?: string }>());
export const addHouseFavoriteSuccess = createAction('[Favorites] Add House Success', props<FavoritesResponse>());
export const addHouseFavoriteFailure = createAction('[Favorites] Add House Failure', props<{ error: string }>());

export const removeHouseFavorite = createAction('[Favorites] Remove House', props<{ url: string }>());
export const removeHouseFavoriteSuccess = createAction('[Favorites] Remove House Success', props<FavoritesResponse>());
export const removeHouseFavoriteFailure = createAction('[Favorites] Remove House Failure', props<{ error: string }>());
