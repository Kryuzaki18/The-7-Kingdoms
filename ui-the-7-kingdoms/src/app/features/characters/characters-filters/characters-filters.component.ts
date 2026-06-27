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

export type CharactersLayout = 'list' | 'grid';

import { CharactersFilters } from '../../../core/types/characters.model';

@Component({
  selector: 'app-characters-filters',
  imports: [],
  templateUrl: './characters-filters.component.html',
  styleUrl: './characters-filters.component.scss',
})
export class CharactersFiltersComponent {
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
  @Input() set gender(v: string) { this.genderValue.set(v); }

  @Output() filtersChange = new EventEmitter<CharactersFilters>();
  @Output() layoutChange = new EventEmitter<CharactersLayout>();

  private readonly elementRef = inject(ElementRef);

  nameValue = signal('');
  genderValue = signal('');
  isDropdownOpen = signal(false);
  layout = signal<CharactersLayout>('list');

  readonly genderOptions = [
    { value: '', label: 'All genders' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
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

  setLayout(value: CharactersLayout): void {
    this.layout.set(value);
    this.layoutChange.emit(value);
  }

  private emit(): void {
    this.filtersChange.emit({ name: this.nameValue(), gender: this.genderValue() });
  }
}
