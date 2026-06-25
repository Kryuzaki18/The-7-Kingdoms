const API_BASE_URL = 'https://anapioficeandfire.com/api';

export const ROUTES = {
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

  ALL_CHARACTERS: (page: number, size: number) => `${API_BASE_URL}/characters?page=${page}&pageSize=${size}`,
  CHARACTER_INFO: (id: number) => `${API_BASE_URL}/characters/${id}`,

  ALL_HOUSES: (page: number, size: number) => `${API_BASE_URL}/houses?page=${page}&pageSize=${size}`,
  HOUSE_INFO: (id: number) => `${API_BASE_URL}/houses/${id}`,
}
