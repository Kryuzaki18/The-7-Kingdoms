import { type FastifyInstance, type FastifyPluginAsync } from "fastify";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const API_PREFIX = "/api/v1";

const appRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(authRoutes, { prefix: `${API_PREFIX}/auth` });
  await fastify.register(userRoutes, { prefix: `${API_PREFIX}/users` });
};

export default appRoutes;
