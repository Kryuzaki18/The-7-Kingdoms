import { createAction, props } from '@ngrx/store';
import { House } from '../../core/types/houses.model';

export const loadHouses = createAction(
  '[Houses] Load Houses',
  props<{ page: number; pageSize?: number; name?: string; region?: string }>(),
);

export const loadHousesSuccess = createAction(
  '[Houses] Load Houses Success',
  props<{ houses: House[]; page: number; hasMore: boolean }>(),
);

export const loadHousesFailure = createAction(
  '[Houses] Load Houses Failure',
  props<{ error: string }>(),
);
