import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';
import { AUTH_FEATURE_KEY } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.user);
export const selectIsAuthenticated = createSelector(selectAuthState, (state) => !!state.user);
export const selectIsLoading = createSelector(selectAuthState, (state) => state.isLoading);
export const selectAuthError = createSelector(selectAuthState, (state) => state.error);
