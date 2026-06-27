import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-page-pagination',
  imports: [],
  templateUrl: './page-pagination.component.html',
  styleUrl: './page-pagination.component.scss',
})
export class PagePaginationComponent {
  page = input<number>(1);
  pageSize = input<number>(10);
  hasMore = input<boolean>(false);
  isLoading = input<boolean>(false);

  pageChange = output<number>();
  pageSizeChange = output<number>();

  readonly pageSizeOptions = [10, 20, 50];
  readonly skipAmount = 5;

  get isPrevDisabled(): boolean {
    return this.page() <= 1 || this.isLoading();
  }

  get isNextDisabled(): boolean {
    return !this.hasMore() || this.isLoading();
  }

  prev(): void {
    if (!this.isPrevDisabled) this.pageChange.emit(this.page() - 1);
  }

  next(): void {
    if (!this.isNextDisabled) this.pageChange.emit(this.page() + 1);
  }

  prevSkip(): void {
    if (!this.isPrevDisabled) this.pageChange.emit(Math.max(1, this.page() - this.skipAmount));
  }

  nextSkip(): void {
    if (!this.isNextDisabled) this.pageChange.emit(this.page() + this.skipAmount);
  }

  selectSize(size: number): void {
    if (size !== this.pageSize()) this.pageSizeChange.emit(size);
  }
}
