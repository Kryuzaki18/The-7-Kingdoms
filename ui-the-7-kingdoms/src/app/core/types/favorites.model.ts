export interface FavoriteItem {
  url: string;
  name: string;
  addedAt: string;
}

export interface FavoritesResponse {
  characters: FavoriteItem[];
  houses: FavoriteItem[];
}

export interface FavoritesState {
  characters: FavoriteItem[];
  houses: FavoriteItem[];
  isLoading: boolean;
  loaded: boolean;
  error: string | null;
}
