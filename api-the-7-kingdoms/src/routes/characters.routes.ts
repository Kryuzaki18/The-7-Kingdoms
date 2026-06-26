import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { charactersService } from '../services/characters.service';
import { GENERAL_RATE_LIMIT } from '../constants/rate-limit.constant';

const charactersRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: { page?: string; pageSize?: string; name?: string; gender?: string } }>(
    '/',
    { config: { rateLimit: GENERAL_RATE_LIMIT } },
    async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch {
        return reply.status(401).send({ message: 'Unauthorized' });
      }

      const { page = '1', pageSize = '50', name, gender } = request.query;

      try {
        const characters = await charactersService.getAll(Number(page), Number(pageSize), name, gender);
        return reply.send(characters);
      } catch {
        return reply.status(502).send({ message: 'Failed to fetch characters' });
      }
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    { config: { rateLimit: GENERAL_RATE_LIMIT } },
    async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch {
        return reply.status(401).send({ message: 'Unauthorized' });
      }

      const { id } = request.params;

      try {
        const character = await charactersService.getById(Number(id));
        return reply.send(character);
      } catch {
        return reply.status(502).send({ message: 'Failed to fetch character' });
      }
    },
  );
};

export default charactersRoutes;
