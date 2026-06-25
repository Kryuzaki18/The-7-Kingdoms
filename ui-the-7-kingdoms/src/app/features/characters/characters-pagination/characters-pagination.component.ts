import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-characters-pagination',
  imports: [],
  templateUrl: './characters-pagination.component.html',
  styleUrl: './characters-pagination.component.scss',
})
export class CharactersPaginationComponent {
  @Input() page: number = 1;
  @Input() hasMore: boolean = false;
  @Input() isLoading: boolean = false;

  @Output() pageChange = new EventEmitter<number>();

  prev(): void {
    if (this.page > 1) this.pageChange.emit(this.page - 1);
  }

  next(): void {
    if (this.hasMore) this.pageChange.emit(this.page + 1);
  }

  get isPrevDisabled(): boolean {
    return this.page <= 1 || this.isLoading;
  }

  get isNextDisabled(): boolean {
    return !this.hasMore || this.isLoading;
  }
}
