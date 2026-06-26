import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AppTitleStrategy } from './core/strategies/app-title.strategy';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AUTH_FEATURE_KEY, authReducer } from './store/auth/auth.reducer';
import * as authEffects from './store/auth/auth.effects';
import { BOOKS_FEATURE_KEY, booksReducer } from './store/books/books.reducer';
import * as booksEffects from './store/books/books.effects';
import { CHARACTERS_FEATURE_KEY, charactersReducer } from './store/characters/characters.reducer';
import * as charactersEffects from './store/characters/characters.effects';
import { HOUSES_FEATURE_KEY, housesReducer } from './store/houses/houses.reducer';
import * as housesEffects from './store/houses/houses.effects';
import { FAVORITES_FEATURE_KEY, favoritesReducer } from './store/favorites/favorites.reducer';
import * as favoritesEffects from './store/favorites/favorites.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideStore({
      [AUTH_FEATURE_KEY]: authReducer,
      [BOOKS_FEATURE_KEY]: booksReducer,
      [CHARACTERS_FEATURE_KEY]: charactersReducer,
      [HOUSES_FEATURE_KEY]: housesReducer,
      [FAVORITES_FEATURE_KEY]: favoritesReducer,
    }),
    provideEffects(authEffects, booksEffects, charactersEffects, housesEffects, favoritesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
