import { createReducer, on } from '@ngrx/store';
import { HousesState } from '../../core/types/houses.model';
import * as HousesActions from './houses.actions';

export const HOUSES_FEATURE_KEY = 'houses';

export const initialHousesState: HousesState = {
  houses: [],
  isLoading: false,
  error: null,
  page: 1,
  hasMore: false,
};

export const housesReducer = createReducer(
  initialHousesState,

  on(HousesActions.loadHouses, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(HousesActions.loadHousesSuccess, (state, { houses, page, hasMore }) => ({
    ...state,
    houses,
    page,
    hasMore,
    isLoading: false,
    error: null,
  })),

  on(HousesActions.loadHousesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
