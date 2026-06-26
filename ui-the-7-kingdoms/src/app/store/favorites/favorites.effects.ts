import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { FavoritesService } from '../../core/services/favorites.service';
import * as FavoritesActions from './favorites.actions';

export const loadFavoritesEffect = createEffect(
  (actions$ = inject(Actions), service = inject(FavoritesService)) =>
    actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      switchMap(() =>
        service.getAll().pipe(
          map((res) => FavoritesActions.loadFavoritesSuccess(res)),
          catchError((err) =>
            of(FavoritesActions.loadFavoritesFailure({ error: err?.error?.message ?? 'Failed to load favorites' })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const addCharacterFavoriteEffect = createEffect(
  (actions$ = inject(Actions), service = inject(FavoritesService)) =>
    actions$.pipe(
      ofType(FavoritesActions.addCharacterFavorite),
      mergeMap(({ url, name, culture, gender }) =>
        service.addCharacter(url, name, culture, gender).pipe(
          map((res) => FavoritesActions.addCharacterFavoriteSuccess(res)),
          catchError((err) =>
            of(FavoritesActions.addCharacterFavoriteFailure({ error: err?.error?.message ?? 'Failed to add favorite' })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const removeCharacterFavoriteEffect = createEffect(
  (actions$ = inject(Actions), service = inject(FavoritesService)) =>
    actions$.pipe(
      ofType(FavoritesActions.removeCharacterFavorite),
      mergeMap(({ url }) =>
        service.removeCharacter(url).pipe(
          map((res) => FavoritesActions.removeCharacterFavoriteSuccess(res)),
          catchError((err) =>
            of(FavoritesActions.removeCharacterFavoriteFailure({ error: err?.error?.message ?? 'Failed to remove favorite' })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const addHouseFavoriteEffect = createEffect(
  (actions$ = inject(Actions), service = inject(FavoritesService)) =>
    actions$.pipe(
      ofType(FavoritesActions.addHouseFavorite),
      mergeMap(({ url, name, region }) =>
        service.addHouse(url, name, region).pipe(
          map((res) => FavoritesActions.addHouseFavoriteSuccess(res)),
          catchError((err) =>
            of(FavoritesActions.addHouseFavoriteFailure({ error: err?.error?.message ?? 'Failed to add favorite' })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const removeHouseFavoriteEffect = createEffect(
  (actions$ = inject(Actions), service = inject(FavoritesService)) =>
    actions$.pipe(
      ofType(FavoritesActions.removeHouseFavorite),
      mergeMap(({ url }) =>
        service.removeHouse(url).pipe(
          map((res) => FavoritesActions.removeHouseFavoriteSuccess(res)),
          catchError((err) =>
            of(FavoritesActions.removeHouseFavoriteFailure({ error: err?.error?.message ?? 'Failed to remove favorite' })),
          ),
        ),
      ),
    ),
  { functional: true },
);
