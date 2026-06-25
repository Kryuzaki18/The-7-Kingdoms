import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState } from '../../core/types/characters.model';
import { CHARACTERS_FEATURE_KEY } from './characters.reducer';

export const selectCharactersState = createFeatureSelector<CharactersState>(CHARACTERS_FEATURE_KEY);

export const selectCharacters = createSelector(selectCharactersState, (s) => s.characters);
export const selectCharactersIsLoading = createSelector(selectCharactersState, (s) => s.isLoading);
export const selectCharactersError = createSelector(selectCharactersState, (s) => s.error);
export const selectCharactersPage = createSelector(selectCharactersState, (s) => s.page);
export const selectCharactersHasMore = createSelector(selectCharactersState, (s) => s.hasMore);
