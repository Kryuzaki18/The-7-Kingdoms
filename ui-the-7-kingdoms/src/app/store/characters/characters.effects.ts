import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CharactersService } from '../../core/services/characters.service';
import * as CharactersActions from './characters.actions';

const DEFAULT_PAGE_SIZE = 10;

export const loadCharactersEffect = createEffect(
  (actions$ = inject(Actions), charactersService = inject(CharactersService)) =>
    actions$.pipe(
      ofType(CharactersActions.loadCharacters),
      switchMap(({ page, pageSize = DEFAULT_PAGE_SIZE }) =>
        charactersService.getCharacters(page, pageSize).pipe(
          map((characters) =>
            CharactersActions.loadCharactersSuccess({
              characters,
              page,
              hasMore: characters.length === pageSize,
            }),
          ),
          catchError((err) =>
            of(
              CharactersActions.loadCharactersFailure({
                error: err?.error?.message ?? 'Failed to load characters',
              }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);
