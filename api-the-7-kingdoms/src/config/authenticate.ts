import fp from "fastify-plugin";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userStore } from "../store/user.store";

export default fp(async function authenticatePlugin(fastify: FastifyInstance) {
  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
        const user = userStore.findById(request.user.sub);
        if (!user) {
          return reply.status(401).send({ message: "Unauthorized" });
        }
      } catch {
        return reply.status(401).send({ message: "Unauthorized" });
      }
    }
  );
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
