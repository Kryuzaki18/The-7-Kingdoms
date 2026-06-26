import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../core/types/auth.model';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, AuthActions.signup, AuthActions.checkAuth, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    AuthActions.loginSuccess,
    AuthActions.checkAuthSuccess,
    (state, { user }) => ({
      ...state,
      user,
      isLoading: false,
      error: null,
    }),
  ),

  on(AuthActions.signupSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(AuthActions.checkAuthFailure, (state) => ({
    ...state,
    user: null,
    isLoading: false,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.logoutSuccess, AuthActions.sessionExpired, () => ({
    ...initialAuthState,
  })),

  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    error: null,
  })),
);
