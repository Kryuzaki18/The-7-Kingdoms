import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../commons/header/header.component';
import { ThemeService } from '../../core/services/theme.service';
import { SoundService } from '../../core/services/sound.service';

interface RainDrop {
  left: string;
  height: string;
  opacity: number;
  delay: string;
  duration: string;
}

interface Star {
  left: string;
  top: string;
  size: string;
  opacity: number;
  delay: string;
  duration: string;
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly themeService = inject(ThemeService);
  readonly soundService = inject(SoundService);

  private isActive = false;

  constructor() {
    effect(() => {
      this.themeService.isDark();
      if (this.isActive) {
        this.soundService.switchTheme();
      }
    });
  }

  ngOnInit(): void {
    this.isActive = true;
    this.soundService.play();
  }

  ngOnDestroy(): void {
    this.isActive = false;
    this.soundService.stop();
  }

  readonly rainDrops: RainDrop[] = Array.from({ length: 90 }, () => ({
    left: `${rand(0, 100).toFixed(2)}%`,
    height: `${Math.round(rand(20, 80))}px`,
    opacity: parseFloat(rand(0.3, 0.7).toFixed(2)),
    delay: `${rand(0, 6).toFixed(2)}s`,
    duration: `${rand(0.55, 1.1).toFixed(2)}s`,
  }));

  readonly stars: Star[] = Array.from({ length: 130 }, () => ({
    left: `${rand(0, 100).toFixed(2)}%`,
    top: `${rand(0, 100).toFixed(2)}%`,
    size: `${rand(1, 2.8).toFixed(1)}px`,
    opacity: parseFloat(rand(0.35, 1).toFixed(2)),
    delay: `${rand(0, 5).toFixed(2)}s`,
    duration: `${rand(2, 5).toFixed(2)}s`,
  }));
}
