import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { loadBooks } from '../../store/books/books.actions';
import { selectBooks, selectBooksError, selectBooksIsLoading } from '../../store/books/books.selectors';

import { PageTitleComponent } from '../shared-components/page-title/page-title.component';

@Component({
  selector: 'app-books',
  imports: [DatePipe, DecimalPipe, PageTitleComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  private readonly store = inject(Store);

  books = toSignal(this.store.select(selectBooks), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectBooksIsLoading), { initialValue: false });
  error = toSignal(this.store.select(selectBooksError), { initialValue: null });

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }
}
