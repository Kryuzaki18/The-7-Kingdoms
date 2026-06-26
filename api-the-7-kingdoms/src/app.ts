import fastify, { type FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyHelmet from "@fastify/helmet";

import appRoutes from "./routes/index";
import envPlugin from "./config/env";
import authenticatePlugin from "./config/authenticate";
import { COOKIE_NAME } from "./constants/auth.constant";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub: string;
      email: string;
    };
    user: {
      sub: string;
      email: string;
    };
  }
}

export async function buildApp(): Promise<FastifyInstance> {
  const app = fastify({ logger: true });

  await app.register(envPlugin);

  await app.register(fastifyHelmet, { contentSecurityPolicy: false });
  await app.register(fastifyRateLimit, { global: false });

  await app.register(fastifyCors, {
    origin: (origin, cb) => {
      const allowed = app.config.CLIENT_ORIGIN.split(",")
        .map((o) => o.trim())
        .filter(Boolean);

      const isAllowed =
        !origin ||
        allowed.some((entry) => {
          if (origin === entry) return true;
          try {
            const entryUrl = new URL(entry);
            const originUrl = new URL(origin);
            return (
              entryUrl.protocol === originUrl.protocol &&
              (originUrl.hostname === entryUrl.hostname ||
                originUrl.hostname === `www.${entryUrl.hostname}` ||
                `www.${originUrl.hostname}` === entryUrl.hostname)
            );
          } catch {
            return false;
          }
        });

      if (isAllowed) {
        cb(null, true);
      } else {
        cb(new Error(`CORS: origin "${origin}" not allowed`), false);
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
    credentials: true,
  });

  await app.register(fastifyCookie, {
    hook: "onRequest",
    parseOptions: {},
  });

  await app.register(fastifyJwt, {
    secret: app.config.JWT_SECRET,
    cookie: {
      cookieName: COOKIE_NAME,
      signed: false,
    },
  });

  await app.register(authenticatePlugin);
  await app.register(appRoutes);

  return app;
}
