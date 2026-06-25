import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { booksService } from '../services/books.service';

const booksRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const books = await booksService.getAllBooks();
      return reply.send(books);
    } catch {
      return reply.status(502).send({ message: 'Failed to fetch books' });
    }
  });
};

export default booksRoutes;
