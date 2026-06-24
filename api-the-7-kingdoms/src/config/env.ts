import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import type { FastifyInstance } from "fastify";

const schema = {
  type: "object",
  required: ["JWT_SECRET", "COOKIE_SECRET", "CLIENT_ORIGIN"],
  properties: {
    PORT: { type: "integer", default: 3000 },
    JWT_SECRET: { type: "string" },
    COOKIE_SECRET: { type: "string" },
    CLIENT_ORIGIN: { type: "string" },
    LOGO_URL: { type: "string", default: "" },
    RESEND_API_KEY: { type: "string", default: "" },
    EMAIL_FROM: { type: "string", default: "" },
    FIREBASE_PROJECT_ID: { type: "string", default: "" },
  },
};

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
      JWT_SECRET: string;
      COOKIE_SECRET: string;
      CLIENT_ORIGIN: string;
      LOGO_URL: string;
      RESEND_API_KEY: string;
      EMAIL_FROM: string;
      FIREBASE_PROJECT_ID: string;
    };
  }
}

export default fp(async function envPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyEnv, { schema, dotenv: true });
});
