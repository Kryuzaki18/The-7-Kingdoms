import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { API_ROUTES } from '../constants/api-routes.constant';
import { Book } from '../types/books.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}${API_ROUTES.books.list}`);
  }
}
