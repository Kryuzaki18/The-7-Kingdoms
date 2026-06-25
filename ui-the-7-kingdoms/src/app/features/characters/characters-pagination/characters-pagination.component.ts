import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-characters-pagination',
  imports: [],
  templateUrl: './characters-pagination.component.html',
  styleUrl: './characters-pagination.component.scss',
})
export class CharactersPaginationComponent {
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() hasMore: boolean = false;
  @Input() isLoading: boolean = false;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  readonly pageSizeOptions = [10, 20, 50];
  readonly skipAmount = 5;

  prev(): void {
    if (!this.isPrevDisabled) this.pageChange.emit(this.page - 1);
  }

  next(): void {
    if (!this.isNextDisabled) this.pageChange.emit(this.page + 1);
  }

  prevSkip(): void {
    if (!this.isPrevDisabled) this.pageChange.emit(Math.max(1, this.page - this.skipAmount));
  }

  nextSkip(): void {
    if (!this.isNextDisabled) this.pageChange.emit(this.page + this.skipAmount);
  }

  selectSize(size: number): void {
    if (size !== this.pageSize) this.pageSizeChange.emit(size);
  }

  get isPrevDisabled(): boolean {
    return this.page <= 1 || this.isLoading;
  }

  get isNextDisabled(): boolean {
    return !this.hasMore || this.isLoading;
  }
}
