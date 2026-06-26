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
} as const;
