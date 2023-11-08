import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { likePostSchema } from "./types";

export const likeRouter = createTRPCRouter({
  like: protectedProcedure
    .input(likePostSchema)
    .mutation(async ({ ctx, input }) => {
      const alreadyLiked = await ctx.db.like.findFirst({
        where: {
          postId: input.postId,
          userId: ctx.session.user.id,
        },
      });

      if (alreadyLiked) {
        await ctx.db.like.delete({
          where: {
            id: alreadyLiked.id,
          },
        });
        return;
      } else {
        await ctx.db.like.create({
          data: {
            post: { connect: { id: input.postId } },
            user: { connect: { id: ctx.session.user.id } },
          },
        });
      }
    }),
});
