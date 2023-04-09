import { now } from "next-auth/client/_utils";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const postsRouter = createTRPCRouter({
  home:   publicProcedure.query(({input}) => {

    return prisma.post.findMany()
    
  })
});
