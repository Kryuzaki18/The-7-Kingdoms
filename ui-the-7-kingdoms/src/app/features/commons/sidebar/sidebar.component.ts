import { Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { ThemeService } from '../../../core/services/theme.service';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }

  protected readonly navLinks = [
    { label: 'Books', path: '/home/books', icon: '/svgs/book.svg' },
    { label: 'Characters', path: '/home/characters', icon: '/svgs/character.svg' },
    { label: 'Houses', path: '/home/houses', icon: '/svgs/castle.svg' },
  ];

  protected readonly themeService = inject(ThemeService);
  private readonly store = inject(Store);

  close(): void {
    this.closed.emit();
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
