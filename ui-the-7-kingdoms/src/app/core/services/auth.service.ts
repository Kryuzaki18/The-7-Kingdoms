import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { API_ROUTES } from '../constants/api-routes.constant';
import { AuthUser } from '../types/auth.model';

import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpService);

  checkAuth(): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${environment.apiUrl}${API_ROUTES.auth.me}`);
  }

  signUp(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${environment.apiUrl}${API_ROUTES.auth.signup}`, {
      email,
      password,
    });
  }

  signIn(email: string, password: string, rememberMe: boolean): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${environment.apiUrl}${API_ROUTES.auth.login}`, {
      email,
      password,
      rememberMe,
    });
  }

  signOut(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}${API_ROUTES.auth.logout}`);
  }
}
