import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HousesService } from '../../core/services/houses.service';
import * as HousesActions from './houses.actions';

const DEFAULT_PAGE_SIZE = 10;

export const loadHousesEffect = createEffect(
  (actions$ = inject(Actions), housesService = inject(HousesService)) =>
    actions$.pipe(
      ofType(HousesActions.loadHouses),
      switchMap(({ page, pageSize = DEFAULT_PAGE_SIZE, name }) =>
        housesService.getHouses(page, pageSize, name).pipe(
          map((houses) =>
            HousesActions.loadHousesSuccess({
              houses,
              page,
              hasMore: houses.length === pageSize,
            }),
          ),
          catchError((err) =>
            of(
              HousesActions.loadHousesFailure({
                error: err?.error?.message ?? 'Failed to load houses',
              }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);
