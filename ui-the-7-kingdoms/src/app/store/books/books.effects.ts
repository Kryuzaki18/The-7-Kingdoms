import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BooksService } from '../../core/services/books.service';
import * as BooksActions from './books.actions';

export const loadBooksEffect = createEffect(
  (actions$ = inject(Actions), booksService = inject(BooksService)) =>
    actions$.pipe(
      ofType(BooksActions.loadBooks),
      exhaustMap(() =>
        booksService.getBooks().pipe(
          map((books) => BooksActions.loadBooksSuccess({ books })),
          catchError((err) =>
            of(BooksActions.loadBooksFailure({ error: err?.error?.message ?? 'Failed to load books' })),
          ),
        ),
      ),
    ),
  { functional: true },
);
