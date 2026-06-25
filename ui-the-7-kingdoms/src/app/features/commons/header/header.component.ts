import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { ThemeService } from '../../../core/services/theme.service';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly store = inject(Store);

  protected readonly navLinks = [
    { label: 'Books', path: '/home/books' },
    { label: 'Characters', path: '/home/characters' },
    { label: 'Houses', path: '/home/houses' },
  ];

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
