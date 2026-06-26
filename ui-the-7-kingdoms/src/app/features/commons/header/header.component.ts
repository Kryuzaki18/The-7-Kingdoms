import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { ThemeService } from '../../../core/services/theme.service';
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectAuthUser } from '../../../store/auth/auth.selectors';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isUserMenuOpen.set(false);
  }

  protected readonly themeService = inject(ThemeService);
  private readonly store = inject(Store);
  private readonly elementRef = inject(ElementRef);

  isMobileMenuOpen = signal(false);
  isUserMenuOpen = signal(false);
  user = toSignal(this.store.select(selectAuthUser));

  protected readonly navLinks = [
    { label: 'Books', path: '/home/books', icon: 'svgs/book.svg' },
    { label: 'Characters', path: '/home/characters', icon: 'svgs/character.svg' },
    { label: 'Houses', path: '/home/houses', icon: 'svgs/castle.svg' },
  ];

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.isUserMenuOpen.update((v) => !v);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
