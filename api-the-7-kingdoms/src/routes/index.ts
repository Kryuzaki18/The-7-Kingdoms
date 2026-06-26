import { type FastifyInstance, type FastifyPluginAsync } from "fastify";

import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import booksRoutes from "./books.routes";
import charactersRoutes from "./characters.routes";
import housesRoutes from "./houses.routes";
import favoritesRoutes from "./favorites.routes";

const API_PREFIX = "/api/v1";

const appRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(authRoutes, { prefix: `${API_PREFIX}/auth` });
  await fastify.register(userRoutes, { prefix: `${API_PREFIX}/users` });
  await fastify.register(booksRoutes, { prefix: `${API_PREFIX}/books` });
  await fastify.register(charactersRoutes, { prefix: `${API_PREFIX}/characters` });
  await fastify.register(housesRoutes, { prefix: `${API_PREFIX}/houses` });
  await fastify.register(favoritesRoutes, { prefix: `${API_PREFIX}/favorites` });
};

export default appRoutes;
