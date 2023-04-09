import { TRPCError } from "@trpc/server";
import { now } from "next-auth/client/_utils";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  postOwnerProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

const createPostInput = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  isActive: z.boolean()
})

const updatePostInput = z.object({
  id: z.string(),
  title: z.string().min(3),
  description: z.optional(z.string().min(10)),
  isActive: z.boolean()
})

const getActivePostInput = z.string()

const deletePostInput = z.string()



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
    .query(({ input: id }) => {
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

      console.log('ctx.session.user.id', ctx.session.user);


      return prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          isActive: input.isActive,
          user: {
            connect: {
              id: ctx.session.user.id ?? 'unknown user id'
            }
          }
        }
      })
    })
  ,
  updatePost: protectedProcedure.input(updatePostInput)
    .mutation(async ({ input, ctx }) => {
      const postExists = await prisma.post.findFirst({
        where: {
          id: input.id
        }
      })

      if (!postExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post does not exist'
        })
      }

      if (postExists.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized to update this post'
        })
      }

      return prisma.post.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          description: input.description,
          isActive: input.isActive,
        }
      })
    }),

  deletePost: protectedProcedure.input(z.string())
    .mutation(async ({ input }) => {
      const postExists = await prisma.post.findFirst({
        where: {
          id: input
        }
      })

      if (!postExists) {
        throw new Error('Post does not exist')
      }

      return prisma.post.delete({
        where: {
          id: input
        }
      })
    }
    ),
});
