import { EXT_ROUTES } from '../config/app-routes';
import { Character } from '../types/characters.model';

export const charactersService = {
  async getAll(page: number = 1, pageSize: number = 50, name?: string): Promise<Character[]> {
    const response = await fetch(EXT_ROUTES.ALL_CHARACTERS(page, pageSize, name));
    if (!response.ok) throw new Error('Failed to fetch characters from external API');
    return response.json() as Promise<Character[]>;
  },

  async getById(id: number): Promise<Character> {
    const response = await fetch(EXT_ROUTES.CHARACTER_INFO(id));
    if (!response.ok) throw new Error('Character not found');
    return response.json() as Promise<Character>;
  },
};
