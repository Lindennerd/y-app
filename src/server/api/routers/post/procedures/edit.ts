import { protectedProcedure } from "~/server/api/trpc";
import { updatePostSchema } from "../types";

export const edit = protectedProcedure
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
  });
