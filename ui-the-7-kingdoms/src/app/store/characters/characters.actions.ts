import { createAction, props } from '@ngrx/store';
import { Character } from '../../core/types/characters.model';

export const loadCharacters = createAction(
  '[Characters] Load Characters',
  props<{ page: number; pageSize?: number; name?: string; gender?: string }>(),
);

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{ characters: Character[]; page: number; hasMore: boolean }>(),
);

export const loadCharactersFailure = createAction(
  '[Characters] Load Characters Failure',
  props<{ error: string }>(),
);
