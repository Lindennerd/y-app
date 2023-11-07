import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createPostSchema, updatePostSchema } from "./types";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          title: input.title,
          subtitle: input.subtitle,
          body: input.body,
          references: {
            createMany: {
              data: input.references?.length
                ? input.references.map((reference) => ({
                    display: reference.display,
                    url: reference?.url ?? "",
                  }))
                : [],
            },
          },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });

      return post;
    }),

  edit: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          subtitle: input.subtitle,
          body: input.body,
          references: {
            createMany: {
              data: input.references?.length
                ? input.references.map((reference) => ({
                    display: reference.display,
                    url: reference?.url ?? "",
                  }))
                : [],
            },
          },
        },
      });

      return post;
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
