import { createReducer, on } from '@ngrx/store';
import { CharactersState } from '../../core/types/characters.model';
import * as CharactersActions from './characters.actions';

export const CHARACTERS_FEATURE_KEY = 'characters';

export const initialCharactersState: CharactersState = {
  characters: [],
  isLoading: false,
  error: null,
  page: 1,
  hasMore: false,
};

export const charactersReducer = createReducer(
  initialCharactersState,

  on(CharactersActions.loadCharacters, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(CharactersActions.loadCharactersSuccess, (state, { characters, page, hasMore }) => ({
    ...state,
    characters,
    page,
    hasMore,
    isLoading: false,
    error: null,
  })),

  on(CharactersActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
