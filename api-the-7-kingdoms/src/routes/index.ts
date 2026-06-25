import { type FastifyInstance, type FastifyPluginAsync } from "fastify";

import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import booksRoutes from "./books.routes";

const API_PREFIX = "/api/v1";

const appRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(authRoutes, { prefix: `${API_PREFIX}/auth` });
  await fastify.register(userRoutes, { prefix: `${API_PREFIX}/users` });
  await fastify.register(booksRoutes, { prefix: `${API_PREFIX}/books` });
};

export default appRoutes;
