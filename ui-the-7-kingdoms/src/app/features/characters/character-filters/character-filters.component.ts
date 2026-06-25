import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  inject,
  signal,
} from '@angular/core';

import { CharacterFilters } from '../../../core/types/characters.model';

@Component({
  selector: 'app-character-filters',
  imports: [],
  templateUrl: './character-filters.component.html',
  styleUrl: './character-filters.component.scss',
})
export class CharacterFiltersComponent {
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

  @Output() filtersChange = new EventEmitter<CharacterFilters>();

  private readonly elementRef = inject(ElementRef);

  nameValue = signal('');
  genderValue = signal('');
  isDropdownOpen = signal(false);

  readonly genderOptions = [
    { value: '', label: 'All genders' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Unknown', label: 'Unknown' },
  ];

  get selectedGenderLabel(): string {
    return this.genderOptions.find((o) => o.value === this.genderValue())?.label ?? 'All genders';
  }

  get hasActiveFilters(): boolean {
    return !!(this.nameValue() || this.genderValue());
  }

  onNameInput(event: Event): void {
    this.nameValue.set((event.target as HTMLInputElement).value);
    this.emit();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen.update((v) => !v);
  }

  selectGender(value: string, event: Event): void {
    event.stopPropagation();
    this.genderValue.set(value);
    this.isDropdownOpen.set(false);
    this.emit();
  }

  clearFilters(): void {
    this.nameValue.set('');
    this.genderValue.set('');
    this.isDropdownOpen.set(false);
    this.emit();
  }

  private emit(): void {
    this.filtersChange.emit({ name: this.nameValue(), gender: this.genderValue() });
  }
}
