import { publicProcedure } from "~/server/api/trpc";
import { getPostByIdSchema } from "../types";

export const getById = publicProcedure
  .input(getPostByIdSchema)
  .query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findFirst({
      where: { id: input.id },
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
    });

    return post;
  });
