import { EXT_ROUTES } from '../config/app-routes';
import { House } from '../types/houses.model';

export const housesService = {
  async getAll(page: number = 1, pageSize: number = 50, name?: string): Promise<House[]> {
    const response = await fetch(EXT_ROUTES.ALL_HOUSES(page, pageSize, name));
    if (!response.ok) throw new Error('Failed to fetch houses from external API');
    return response.json() as Promise<House[]>;
  },

  async getById(id: number): Promise<House> {
    const response = await fetch(EXT_ROUTES.HOUSE_INFO(id));
    if (!response.ok) throw new Error('House not found');
    return response.json() as Promise<House>;
  },
};
