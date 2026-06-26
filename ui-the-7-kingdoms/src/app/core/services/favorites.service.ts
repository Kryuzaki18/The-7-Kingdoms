import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API_ROUTES } from '../constants/api-routes.constant';
import { FavoritesResponse } from '../types/favorites.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly http = inject(HttpService);

  getAll(): Observable<FavoritesResponse> {
    return this.http.get<FavoritesResponse>(`${environment.apiUrl}${API_ROUTES.favorites.list}`);
  }

  addCharacter(url: string, name: string, culture?: string, gender?: string): Observable<FavoritesResponse> {
    return this.http.post<FavoritesResponse>(
      `${environment.apiUrl}${API_ROUTES.favorites.addCharacter}`,
      { url, name, culture, gender },
    );
  }

  removeCharacter(url: string): Observable<FavoritesResponse> {
    const id = Number(url.split('/').pop());
    return this.http.delete<FavoritesResponse>(
      `${environment.apiUrl}${API_ROUTES.favorites.removeCharacter(id)}`,
    );
  }

  addHouse(url: string, name: string, region?: string): Observable<FavoritesResponse> {
    return this.http.post<FavoritesResponse>(
      `${environment.apiUrl}${API_ROUTES.favorites.addHouse}`,
      { url, name, region },
    );
  }

  removeHouse(url: string): Observable<FavoritesResponse> {
    const id = Number(url.split('/').pop());
    return this.http.delete<FavoritesResponse>(
      `${environment.apiUrl}${API_ROUTES.favorites.removeHouse(id)}`,
    );
  }
}
