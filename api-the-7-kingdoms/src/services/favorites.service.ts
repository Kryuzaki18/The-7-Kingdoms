import { FavoriteItem, UserFavorites } from '../types/favorites.model';

const store = new Map<string, UserFavorites>();

function getOrCreate(userId: string): UserFavorites {
  if (!store.has(userId)) {
    store.set(userId, { characters: [], houses: [] });
  }
  return store.get(userId)!;
}

export const favoritesService = {
  getAll(userId: string): UserFavorites {
    return getOrCreate(userId);
  },

  addCharacter(userId: string, item: Pick<FavoriteItem, 'url' | 'name'> & { culture?: string; gender?: string }): UserFavorites {
    const favorites = getOrCreate(userId);
    if (!favorites.characters.some((c) => c.url === item.url)) {
      favorites.characters.push({ ...item, addedAt: new Date().toISOString() });
    }
    return favorites;
  },

  removeCharacter(userId: string, id: number): UserFavorites {
    const favorites = getOrCreate(userId);
    favorites.characters = favorites.characters.filter(
      (c) => Number(c.url.split('/').pop()) !== id,
    );
    return favorites;
  },

  addHouse(userId: string, item: Pick<FavoriteItem, 'url' | 'name'> & { region?: string }): UserFavorites {
    const favorites = getOrCreate(userId);
    if (!favorites.houses.some((h) => h.url === item.url)) {
      favorites.houses.push({ ...item, addedAt: new Date().toISOString() });
    }
    return favorites;
  },

  removeHouse(userId: string, id: number): UserFavorites {
    const favorites = getOrCreate(userId);
    favorites.houses = favorites.houses.filter(
      (h) => Number(h.url.split('/').pop()) !== id,
    );
    return favorites;
  },
};
