import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { API_ROUTES } from '../constants/api-routes.constant';
import { Character } from '../types/characters.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly http = inject(HttpClient);

  getCharacters(page: number = 1, pageSize: number = 50): Observable<Character[]> {
    const url = `${environment.apiUrl}${API_ROUTES.characters.list}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<Character[]>(url);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.apiUrl}${API_ROUTES.characters.info(id)}`);
  }
}
