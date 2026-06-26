import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FavoriteItem } from '../../../core/types/favorites.model';

@Component({
  selector: 'app-fav-characters',
  imports: [RouterLink],
  templateUrl: './fav-characters.component.html',
  styleUrl: './fav-characters.component.scss',
})
export class FavCharactersComponent {
  @Input() items: FavoriteItem[] = [];
  @Output() open = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
