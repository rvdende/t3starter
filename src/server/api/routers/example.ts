import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const exampleRouter = createTRPCRouter({
  list: publicProcedure.query(async ({}) => {
    const result = await db.selectFrom("testtable").selectAll().execute();

    return result;
  }),
  add: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input }) => {
      const result = await db
        .insertInto("testtable")
        .values({
          title: input.title,
        })
        .returningAll()
        .execute();

      return result;
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
