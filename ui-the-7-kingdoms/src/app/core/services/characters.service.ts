import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { API_ROUTES } from '../constants/api-routes.constant';
import { Character } from '../types/characters.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly http = inject(HttpService);

  getCharacters(page: number = 1, pageSize: number = 50, name?: string, gender?: string): Observable<Character[]> {
    const params: Record<string, string | number | boolean> = { page, pageSize };
    if (name) params['name'] = name;
    if (gender === 'Male' || gender === 'Female') params['gender'] = gender;
    return this.http.get<Character[]>(`${environment.apiUrl}${API_ROUTES.characters.list}`, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.apiUrl}${API_ROUTES.characters.info(id)}`);
  }
}
