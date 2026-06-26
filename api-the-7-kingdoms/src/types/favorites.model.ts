export interface FavoriteItem {
  url: string;
  name: string;
  addedAt: string;
  culture?: string;
  gender?: string;
  region?: string;
}

export interface UserFavorites {
  characters: FavoriteItem[];
  houses: FavoriteItem[];
}
