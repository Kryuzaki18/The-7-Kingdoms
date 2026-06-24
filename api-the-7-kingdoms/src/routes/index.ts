import { type FastifyInstance, type FastifyPluginAsync } from "fastify";

import healthRoutes    from "./health.routes";

const API_PREFIX = "/api/v1";

const appRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(healthRoutes,    { prefix: API_PREFIX });
};

export default appRoutes;
