import { TRPCError } from "@trpc/server";
import { now } from "next-auth/client/_utils";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { hash } from "~/utils/manageHash";

export const signUpRouter = createTRPCRouter({
    signUp: publicProcedure
        // .input(z.object({
        //     name: z.string(),
        //     email: z.string(),
        //     password: z.string()
        // }))

        .mutation( ({ input }) => {

            console.log(3434343344343);
            return {
                id: 1,
            }
            

            // const userExists = await prisma.user.findUnique({
            //     where: {
            //         email: input.email
            //     }
            // })

            // if (userExists) {
            //     throw new Error('User already exists')
            // }

            // const user = await prisma.user.create({
            //     data: {
            //         name: input.name,
            //         email: input.email,
            //         // password: hash(input.password)

            //     }
            // })
            // console.log(user);
            
            // return {
            //     id: user.id,
            //     name: user.name,
            //     email: user.email,
            // };
        }),
});
