import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { DecodedIdToken } from "firebase-admin/auth";
import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";

export default fp(async function firebaseAdmin(fastify: FastifyInstance) {
  try {
    if (!getApps().length) {
      initializeApp({
        credential: applicationDefault(),
        projectId: fastify.config.FIREBASE_PROJECT_ID,
      });
    }
    fastify.decorate(
      "verifyFirebaseToken",
      async (idToken: string): Promise<DecodedIdToken> => {
        return getAuth().verifyIdToken(idToken);
      },
    );
  } catch (err) {
    fastify.log.warn({ err }, "Firebase initialization failed — verifyFirebaseToken unavailable");
    fastify.decorate("verifyFirebaseToken", async (_idToken: string): Promise<DecodedIdToken> => {
      throw new Error("Firebase not configured");
    });
  }
});

declare module "fastify" {
  interface FastifyInstance {
    verifyFirebaseToken: (idToken: string) => Promise<DecodedIdToken>;
  }
}
