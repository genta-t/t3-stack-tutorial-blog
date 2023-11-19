import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() })) // 型定義を行なっている
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAllBlogs: publicProcedure.query(() => {
    return db.post.findMany();
  }),
  postBlog: publicProcedure.input(
    z.object({ 
      title: z.string(),
      description: z.string(),
    }),
  ).mutation((req) => {
    const postBlog = db.post.create({
      data : {
        title: req.input.title,
        description: req.input.description,
      }
    });
    return postBlog;
  }),
});
