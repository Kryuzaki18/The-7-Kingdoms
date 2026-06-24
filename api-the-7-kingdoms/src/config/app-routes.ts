const API_BASE_URL = 'https://anapioficeandfire.com/api';

export const ROUTES = {
  HEALTH: "/health",
  AUTH: {
    ME: 'me',
    LOGIN: 'login',
    SIGNUP: 'signup',
    LOGOUT: 'logout',
  }
};

export const EXT_ROUTES = {
  ALL_BOOKS: `${API_BASE_URL}/books`,
  BOOKS: (id: number) => `${API_BASE_URL}/books/${id}`,
  CHARACTERS: (id: number) => `${API_BASE_URL}/characters/${id}`,
  HOUSES: (id: number) => `${API_BASE_URL}/houses/${id}`,
}
