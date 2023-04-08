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

    const user = prisma.user.create({
      data: {
        name : 'ash'
      }
    })

    // console.log(user.then());
    

    // prisma.post.create({
    //   data: {
    //     title: 'the title',
    //     userId:,

    //   }
    // })
    const posts = prisma.post.findMany()

    console.log(`pooooooosts ${posts}`);

    return posts;
    
  })
});
