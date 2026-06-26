import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { API_ROUTES } from '../constants/api-routes.constant';
import { House } from '../types/houses.model';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class HousesService {
  private readonly http = inject(HttpService);

  getHouses(page: number = 1, pageSize: number = 50, name?: string, region?: string): Observable<House[]> {
    const params: Record<string, string | number | boolean> = { page, pageSize };
    if (name) params['name'] = name;
    if (region) params['region'] = region;
    return this.http.get<House[]>(`${environment.apiUrl}${API_ROUTES.houses.list}`, { params });
  }

  getHouseById(id: number): Observable<House> {
    return this.http.get<House>(`${environment.apiUrl}${API_ROUTES.houses.info(id)}`);
  }
}
