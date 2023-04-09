import { now } from "next-auth/client/_utils";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

const createPostInput = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  isActive: z.boolean()
})

const getActivePostInput =  z.string()



export const postsRouter = createTRPCRouter({
  home: publicProcedure.query(({ input }) => {

    return prisma.post.findMany({
      where: {
        isActive: true
      }
    })

  }),
  getActivePost: publicProcedure
    .input(getActivePostInput)
    .query(({ input:id }) => {
      return prisma.post.findFirst({
        where: {
          id,
          isActive: true
        }
      })
    }),
  createPost: protectedProcedure
    .input(createPostInput)
    .mutation(async ({ input, ctx }) => {

      const postExists = await prisma.post.findFirst
        ({
          where: {
            title: input.title
          }
        })

      if (postExists) {
        throw new Error('Post already exists')
      }

      return prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          isActive: input.isActive,
          user: {
            connect: {
              id: ctx.session.user.id
            }
          }
        }
      })
    })
  ,
});
