import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FavoriteItem } from '../../../core/types/favorites.model';

@Component({
  selector: 'app-fav-houses',
  imports: [RouterLink],
  templateUrl: './fav-houses.component.html',
  styleUrl: './fav-houses.component.scss',
})
export class FavHousesComponent {
  @Input() items: FavoriteItem[] = [];
  @Output() open = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
