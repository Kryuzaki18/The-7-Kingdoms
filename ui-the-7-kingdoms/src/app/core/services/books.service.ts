import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { API_ROUTES } from '../constants/api-routes.constant';
import { Book } from '../types/books.model';

import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpService);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}${API_ROUTES.books.list}`);
  }
}
