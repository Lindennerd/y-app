import { protectedProcedure } from "~/server/api/trpc";
import { createPostSchema } from "../types";

export const create = protectedProcedure
  .input(createPostSchema)
  .mutation(async ({ ctx, input }) => {
    const post = await ctx.db.post.create({
      data: {
        title: input.title,
        subtitle: input.subtitle,
        body: input.body,
        responseTo: {
          connect: input.responseTo ? { id: input.responseTo } : undefined,
        },
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
  });
