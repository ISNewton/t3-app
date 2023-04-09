import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { postsRouter } from "~/server/api/routers/posts";
import { signUpRouter } from "~/server/api/routers/signup";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  posts: postsRouter,
  signUp: signUpRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
