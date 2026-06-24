import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { userStore } from "../store/user.store";

const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.get("/profile", async (request, reply) => {
    const user = userStore.findById(request.user.sub);
    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }
    return reply.send(userStore.toPublic(user));
  });
};

export default userRoutes;
