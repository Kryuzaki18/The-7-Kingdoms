import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../core/types/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string; rememberMe: boolean }>(),
);
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: AuthUser }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const signup = createAction('[Auth] Signup', props<{ email: string; password: string }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ user: AuthUser }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const checkAuth = createAction('[Auth] Check Auth');
export const checkAuthSuccess = createAction(
  '[Auth] Check Auth Success',
  props<{ user: AuthUser }>(),
);
export const checkAuthFailure = createAction('[Auth] Check Auth Failure');

export const clearAuthError = createAction('[Auth] Clear Error');
export const sessionExpired = createAction('[Auth] Session Expired');
