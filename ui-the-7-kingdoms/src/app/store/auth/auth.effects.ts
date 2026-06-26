import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password, rememberMe }) =>
        authService.signIn(email, password, rememberMe).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err?.error?.message ?? 'Login failed' })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const loginSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => router.navigate(['/home'])),
    ),
  { functional: true, dispatch: false },
);

export const signupEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap(({ email, password }) =>
        authService.signUp(email, password).pipe(
          map((user) => AuthActions.signupSuccess({ user })),
          catchError((err) =>
            of(AuthActions.signupFailure({ error: err?.error?.message ?? 'Sign up failed' })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const signupSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.signupSuccess),
      tap(() => router.navigate(['/login'])),
    ),
  { functional: true, dispatch: false },
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        authService.signOut().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess())),
        ),
      ),
    ),
  { functional: true },
);

export const logoutSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.logoutSuccess, AuthActions.sessionExpired),
      tap(() => router.navigate(['/login'])),
    ),
  { functional: true, dispatch: false },
);

export const checkAuthEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.checkAuth),
      exhaustMap(() =>
        authService.checkAuth().pipe(
          map((user) => AuthActions.checkAuthSuccess({ user })),
          catchError(() => of(AuthActions.checkAuthFailure())),
        ),
      ),
    ),
  { functional: true },
);
