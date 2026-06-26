import { inject, Injectable } from '@angular/core';

import { LocalStorageService } from './localStorage.service';
import { STORAGE } from '../constants/storage.constant';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private readonly localStorageService = inject(LocalStorageService);

  readonly isMuted = this.localStorageService.getLocalStorageSignal<boolean>(STORAGE.sound, true);

  private audio: HTMLAudioElement | null = null;
  private currentSrc: string | null = null;

  toggle(): void {
    const muting = !this.isMuted();
    this.localStorageService.updateLocalStorageSignal(STORAGE.sound, muting);
    if (muting) {
      this.pause();
    } else {
      this.resume();
    }
  }

  play(isDark: boolean): void {
    const src = isDark ? 'sounds/night.mp3' : 'sounds/rain.mp3';
    if (this.currentSrc === src && this.audio && !this.audio.paused) return;

    this.destroyAudio();
    this.currentSrc = src;
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = isDark ? 0.35 : 0.4;

    if (!this.isMuted()) {
      this.audio.play().catch(() => {});
    }
  }

  switchTheme(isDark: boolean): void {
    if (!this.isMuted()) {
      this.play(isDark);
    } else {
      this.currentSrc = isDark ? 'sounds/night.mp3' : 'sounds/rain.mp3';
    }
  }

  stop(): void {
    this.destroyAudio();
    this.currentSrc = null;
  }

  private pause(): void {
    this.audio?.pause();
  }

  private resume(): void {
    if (this.audio && this.currentSrc) {
      this.audio.play().catch(() => {});
    }
  }

  private destroyAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }
}
