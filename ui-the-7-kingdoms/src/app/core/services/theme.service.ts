import { effect, inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LocalStorageService } from './localStorage.service';
import { STORAGE } from '../constants/storage.constant';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly localStorageService = inject(LocalStorageService);

  readonly isDark = this.localStorageService.getLocalStorageSignal<boolean>(STORAGE.theme, false);

  constructor() {
    effect(() => {
      const html = this.document.documentElement;
      if (this.isDark()) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });
  }

  toggle(): void {
    this.localStorageService.updateLocalStorageSignal(STORAGE.theme, !this.isDark());
  }
}
