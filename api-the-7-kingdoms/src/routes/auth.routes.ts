import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { authService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { userStore } from "../store/user.store";
import {
  COOKIE_NAME,
  TOKEN_EXPIRY_SESSION,
  TOKEN_EXPIRY_REMEMBER,
  SEVEN_DAYS_SECONDS,
  THIRTY_DAYS_SECONDS,
} from "../constants/auth.constant";
import { ROUTES } from "../config/app-routes";

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post(`/${ROUTES.AUTH.SIGNUP}`, async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ message: parsed.error.issues[0].message });
    }

    const { email, password } = parsed.data;

    try {
      const user = await authService.register(email, password);

      return reply.status(201).send(userStore.toPublic(user));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      return reply.status(409).send({ message });
    }
  });

  fastify.post(`/${ROUTES.AUTH.LOGIN}`, async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ message: parsed.error.issues[0].message });
    }

    const { email, password, rememberMe } = parsed.data;

    try {
      const user = await authService.login(email, password);
      const expiresIn = rememberMe ? TOKEN_EXPIRY_REMEMBER : TOKEN_EXPIRY_SESSION;
      const maxAge = rememberMe ? THIRTY_DAYS_SECONDS : SEVEN_DAYS_SECONDS;

      const token = fastify.jwt.sign(
        { sub: user.id, email: user.email },
        { expiresIn }
      );

      reply.setCookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
      });

      return reply.send(userStore.toPublic(user));
    } catch {
      return reply.status(401).send({ message: "Invalid credentials" });
    }
  });

  fastify.post(
    `/${ROUTES.AUTH.LOGOUT}`,
    { preHandler: [fastify.authenticate] },
    async (_request, reply) => {
      reply.clearCookie(COOKIE_NAME, { path: "/" });
      return reply.send({ message: "Logged out" });
    }
  );

  fastify.get(
    `/${ROUTES.AUTH.ME}`,
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = userStore.findById(request.user.sub);
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
      return reply.send(userStore.toPublic(user));
    }
  );
};

export default authRoutes;
