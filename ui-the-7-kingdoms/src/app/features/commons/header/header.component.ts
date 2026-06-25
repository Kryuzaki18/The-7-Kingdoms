import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { ThemeService } from '../../../core/services/theme.service';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly store = inject(Store);

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
