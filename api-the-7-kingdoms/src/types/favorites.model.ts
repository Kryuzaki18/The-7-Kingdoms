export interface FavoriteItem {
  url: string;
  name: string;
  addedAt: string;
}

export interface UserFavorites {
  characters: FavoriteItem[];
  houses: FavoriteItem[];
}
