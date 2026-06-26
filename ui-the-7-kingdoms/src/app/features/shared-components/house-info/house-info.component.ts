import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { House } from '../../../core/types/houses.model';

@Component({
  selector: 'app-house-info',
  imports: [],
  templateUrl: './house-info.component.html',
  styleUrl: './house-info.component.scss',
})
export class HouseInfoComponent {
  @Input() house!: House;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.closed.emit();
  }

  get activeTitles(): string[] {
    return this.house.titles.filter((t) => t);
  }

  get activeSeats(): string[] {
    return this.house.seats.filter((s) => s);
  }

  get activeAncestralWeapons(): string[] {
    return this.house.ancestralWeapons.filter((w) => w);
  }
}
