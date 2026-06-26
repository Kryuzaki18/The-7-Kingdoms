import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { favoritesService } from '../services/favorites.service';
import { ROUTES } from '../config/app-routes';

const favoritesRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
    const userId = (request.user as { sub: string }).sub;
    return reply.send(favoritesService.getAll(userId));
  });

  fastify.post<{ Body: { url: string; name: string; culture?: string; gender?: string } }>(ROUTES.FAVORITES.CHARACTERS, async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
    const userId = (request.user as { sub: string }).sub;
    const { url, name, culture, gender } = request.body;
    return reply.send(favoritesService.addCharacter(userId, { url, name, culture, gender }));
  });

  fastify.delete<{ Params: { id: string } }>(ROUTES.FAVORITES.CHARACTER_ID, async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
    const userId = (request.user as { sub: string }).sub;
    return reply.send(favoritesService.removeCharacter(userId, Number(request.params.id)));
  });

  fastify.post<{ Body: { url: string; name: string; region?: string } }>(ROUTES.FAVORITES.HOUSES, async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
    const userId = (request.user as { sub: string }).sub;
    const { url, name, region } = request.body;
    return reply.send(favoritesService.addHouse(userId, { url, name, region }));
  });

  fastify.delete<{ Params: { id: string } }>(ROUTES.FAVORITES.HOUSE_ID, async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
    const userId = (request.user as { sub: string }).sub;
    return reply.send(favoritesService.removeHouse(userId, Number(request.params.id)));
  });
};

export default favoritesRoutes;
