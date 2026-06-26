import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './core/guards/auth.guard';

import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { HomeComponent } from './features/home/home.component';
import { CharactersComponent } from './features/characters/characters.component';
import { HousesComponent } from './features/houses/houses.component';
import { BooksComponent } from './features/books/books.component';
import { FavoritesComponent } from './features/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'signup', component: SignupComponent, title: 'Signup' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: 'characters', component: CharactersComponent, title: 'Characters' },
      { path: 'houses', component: HousesComponent, title: 'Houses' },
      { path: 'books', component: BooksComponent, title: 'Books' },
      { path: 'favorites', component: FavoritesComponent, title: 'Favorites' },
      { path: '', redirectTo: '/home/characters', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
