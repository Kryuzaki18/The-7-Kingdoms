import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HousesState } from '../../core/types/houses.model';
import { HOUSES_FEATURE_KEY } from './houses.reducer';

export const selectHousesState = createFeatureSelector<HousesState>(HOUSES_FEATURE_KEY);

export const selectHouses = createSelector(selectHousesState, (s) => s.houses);
export const selectHousesIsLoading = createSelector(selectHousesState, (s) => s.isLoading);
export const selectHousesError = createSelector(selectHousesState, (s) => s.error);
export const selectHousesPage = createSelector(selectHousesState, (s) => s.page);
export const selectHousesHasMore = createSelector(selectHousesState, (s) => s.hasMore);
