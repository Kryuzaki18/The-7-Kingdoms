import { createReducer, on } from '@ngrx/store';
import { BooksState } from '../../core/types/books.model';
import * as BooksActions from './books.actions';

export const BOOKS_FEATURE_KEY = 'books';

export const initialBooksState: BooksState = {
  books: [],
  isLoading: false,
  error: null,
};

export const booksReducer = createReducer(
  initialBooksState,

  on(BooksActions.loadBooks, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(BooksActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    isLoading: false,
    error: null,
  })),

  on(BooksActions.loadBooksFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
