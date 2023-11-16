import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const publishPost = protectedProcedure
  .input(z.object({ postId: z.number() }))
  .mutation(async ({ ctx, input }) => ({
    post: await ctx.db.post.update({
      where: {
        id: input.postId,
        AND: { createdById: ctx.session!.user.id },
      },
      data: { draft: false },
    }),
  }));
