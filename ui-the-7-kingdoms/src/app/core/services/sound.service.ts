import { inject, Injectable, signal } from '@angular/core';

import { ThemeService } from './theme.service';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private readonly themeService = inject(ThemeService);

  isMuted = signal(true);

  private audio: HTMLAudioElement | null = null;
  private currentSrc: string | null = null;

  toggle(): void {
    const muting = !this.isMuted();
    this.isMuted.set(muting);
    if (muting) {
      this.pause();
    } else {
      this.play();
    }
  }

  play(): void {
    const isDark = this.themeService.isDark();
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

  switchTheme(): void {
    if (!this.isMuted()) {
      this.play();
    }
  }

  stop(): void {
    this.destroyAudio();
    this.currentSrc = null;
  }

  private pause(): void {
    this.audio?.pause();
  }

  private destroyAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }
}
