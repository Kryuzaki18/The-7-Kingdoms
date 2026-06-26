import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { housesService } from '../services/houses.service';

const housesRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: { page?: string; pageSize?: string; name?: string } }>(
    '/',
    async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch {
        return reply.status(401).send({ message: 'Unauthorized' });
      }

      const { page = '1', pageSize = '50', name } = request.query;

      try {
        const houses = await housesService.getAll(Number(page), Number(pageSize), name);
        return reply.send(houses);
      } catch {
        return reply.status(502).send({ message: 'Failed to fetch houses' });
      }
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch {
        return reply.status(401).send({ message: 'Unauthorized' });
      }

      const { id } = request.params;

      try {
        const house = await housesService.getById(Number(id));
        return reply.send(house);
      } catch {
        return reply.status(502).send({ message: 'Failed to fetch house' });
      }
    },
  );
};

export default housesRoutes;
