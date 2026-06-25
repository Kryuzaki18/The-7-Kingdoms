import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from '../../core/types/books.model';
import { BOOKS_FEATURE_KEY } from './books.reducer';

export const selectBooksState = createFeatureSelector<BooksState>(BOOKS_FEATURE_KEY);

export const selectBooks = createSelector(selectBooksState, (state) => state.books);
export const selectBooksIsLoading = createSelector(selectBooksState, (state) => state.isLoading);
export const selectBooksError = createSelector(selectBooksState, (state) => state.error);
