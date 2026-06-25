import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, of, switchMap, take } from 'rxjs';

import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthState } from '../../store/auth/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAuthState).pipe(
    take(1),
    switchMap((state) => {
      if (state.user) return of(true);

      if (!state.isLoading) {
        store.dispatch(AuthActions.checkAuth());
      }

      return store.select(selectAuthState).pipe(
        filter((s) => !s.isLoading),
        take(1),
        map((s) => (s.user ? true : router.createUrlTree(['/login']))),
      );
    }),
  );
};

export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAuthState).pipe(
    take(1),
    switchMap((state) => {
      if (state.user) return of(router.createUrlTree(['/home']));

      if (!state.isLoading) {
        store.dispatch(AuthActions.checkAuth());
      }

      return store.select(selectAuthState).pipe(
        filter((s) => !s.isLoading),
        take(1),
        map((s) => (s.user ? router.createUrlTree(['/home']) : true)),
      );
    }),
  );
};
