import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { HousesFilters } from '../../../core/types/houses.model';

@Component({
  selector: 'app-houses-filters',
  imports: [],
  templateUrl: './houses-filters.component.html',
  styleUrl: './houses-filters.component.scss',
})
export class HousesFiltersComponent {
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isDropdownOpen.set(false);
  }

  @Input() set name(v: string) { this.nameValue.set(v); }
  @Input() set region(v: string) { this.regionValue.set(v); }

  @Output() filtersChange = new EventEmitter<HousesFilters>();

  private readonly elementRef = inject(ElementRef);

  nameValue = signal('');
  regionValue = signal('');
  isDropdownOpen = signal(false);

  readonly regionOptions = [
    { value: '', label: 'All regions' },
    { value: 'The Westerlands', label: 'The Westerlands' },
    { value: 'Dorne', label: 'Dorne' },
    { value: 'The North', label: 'The North' },
    { value: 'The Reach', label: 'The Reach' },
    { value: 'The Vale', label: 'The Vale' },
    { value: 'The Riverlands', label: 'The Riverlands' },
    { value: 'The Crownlands', label: 'The Crownlands' },
    { value: 'The Stormlands', label: 'The Stormlands' },
    { value: 'The Neck', label: 'The Neck' },
    { value: 'Iron Islands', label: 'Iron Islands' },
    { value: 'Beyond the Wall', label: 'Beyond the Wall' },
  ];

  get selectedRegionLabel(): string {
    return this.regionOptions.find((o) => o.value === this.regionValue())?.label ?? 'All regions';
  }

  get hasActiveFilters(): boolean {
    return !!(this.nameValue() || this.regionValue());
  }

  onNameInput(event: Event): void {
    this.nameValue.set((event.target as HTMLInputElement).value);
    this.emit();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen.update((v) => !v);
  }

  selectRegion(value: string, event: Event): void {
    event.stopPropagation();
    this.regionValue.set(value);
    this.isDropdownOpen.set(false);
    this.emit();
  }

  clearFilters(): void {
    this.nameValue.set('');
    this.regionValue.set('');
    this.isDropdownOpen.set(false);
    this.emit();
  }

  private emit(): void {
    this.filtersChange.emit({ name: this.nameValue(), region: this.regionValue() });
  }
}
