import { publicProcedure } from "~/server/api/trpc";
import { getPostByIdSchema } from "../types";

export const getResponses = publicProcedure
  .input(getPostByIdSchema)
  .query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findFirst({
      where: { id: input.id },
      include: {
        responses: {
          where: { draft: false },
          include: {
            references: true,
            tags: true,
            likes: true,
            responseTo: {
              select: {
                id: true,
                title: true,
              },
            },
            responses: {
              select: {
                id: true,
              },
            },
            createdBy: {
              include: {
                following: true,
                accounts: {
                  select: {
                    user: {
                      select: {
                        image: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return post?.responses ?? [];
  });
