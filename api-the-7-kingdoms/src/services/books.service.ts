import { EXT_ROUTES } from '../config/app-routes';
import { Book } from '../types/books.type';

export const booksService = {
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(EXT_ROUTES.ALL_BOOKS);
    if (!response.ok) {
      throw new Error('Failed to fetch books from external API');
    }
    return response.json() as Promise<Book[]>;
  },
};
