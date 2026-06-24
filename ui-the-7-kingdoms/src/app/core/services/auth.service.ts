import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, shareReplay, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { API_ROUTES } from '../constants/api-routes.constant';

interface IAuth {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly session = signal<boolean>(false);
  private checkAuth$?: Observable<boolean>;
  private hasChecked = false;

  isLoggedIn = computed(() => !!this.session());

  clearSession(): void {
    this.session.set(false);
    this.hasChecked = false;
  }

  checkAuth(): Observable<boolean> {
    if (this.session()) return of(true);

    if (this.hasChecked) {
      return of(this.session());
    }

    if (this.checkAuth$) return this.checkAuth$;

    this.checkAuth$ = this.http
      .get<boolean>(`${environment.apiUrl}${API_ROUTES.auth.me}`)
      .pipe(
        tap((isAuth: boolean) => {
          this.session.set(isAuth);
          this.hasChecked = true;
          this.checkAuth$ = undefined;
        }),
        catchError(() => {
          this.session.set(false);
          this.hasChecked = true;
          this.checkAuth$ = undefined;
          return of(false);
        }),
        shareReplay(1),
      );

    return this.checkAuth$;
  }

  signUp(email: string, password: string): Observable<IAuth> {
    return this.http.post<IAuth>(`${environment.apiUrl}${API_ROUTES.auth.signup}`, {
      email,
      password,
    });
  }

  signIn(email: string, password: string, rememberMe: boolean): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${environment.apiUrl}${API_ROUTES.auth.login}`, {
        email,
        password,
        rememberMe,
      })
      .pipe(
        tap(() => {
          this.session.set(true);
        }),
      );
  }

  signOut(): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${environment.apiUrl}${API_ROUTES.auth.logout}`, {})
      .pipe(
        tap(() => {
          this.clearSession();
        }),
        catchError((err) => {
          this.clearSession();
          return throwError(() => err);
        }),
      );
  }
}
