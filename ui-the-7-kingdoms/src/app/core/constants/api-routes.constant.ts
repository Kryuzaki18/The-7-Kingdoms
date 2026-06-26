const PREFIX = '/api/v1';
export const API_ROUTES = {
  auth: {
    me: `${PREFIX}/auth/me`,
    login: `${PREFIX}/auth/login`,
    signup: `${PREFIX}/auth/signup`,
    logout: `${PREFIX}/auth/logout`,
  },
  books: {
    list: `${PREFIX}/books`,
  },
  characters: {
    list: `${PREFIX}/characters`,
    info: (id: number) => `${PREFIX}/characters/${id}`,
  },
  houses: {
    list: `${PREFIX}/houses`,
    info: (id: number) => `${PREFIX}/houses/${id}`,
  },
  favorites: {
    list: `${PREFIX}/favorites`,
    addCharacter: `${PREFIX}/favorites/characters`,
    removeCharacter: (id: number) => `${PREFIX}/favorites/characters/${id}`,
    addHouse: `${PREFIX}/favorites/houses`,
    removeHouse: (id: number) => `${PREFIX}/favorites/houses/${id}`,
  },
} as const;
