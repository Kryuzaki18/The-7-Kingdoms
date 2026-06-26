import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { HousesFilters } from '../../../core/types/houses.model';

@Component({
  selector: 'app-houses-filters',
  imports: [],
  templateUrl: './houses-filters.component.html',
  styleUrl: './houses-filters.component.scss',
})
export class HousesFiltersComponent {
  @Input() set name(v: string) { this.nameValue.set(v); }

  @Output() filtersChange = new EventEmitter<HousesFilters>();

  nameValue = signal('');

  get hasActiveFilters(): boolean {
    return !!this.nameValue();
  }

  onNameInput(event: Event): void {
    this.nameValue.set((event.target as HTMLInputElement).value);
    this.emit();
  }

  clearFilters(): void {
    this.nameValue.set('');
    this.emit();
  }

  private emit(): void {
    this.filtersChange.emit({ name: this.nameValue() });
  }
}
