import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";

export const getProfile = publicProcedure
  .input(
    z.object({
      email: z.string(),
      limit: z.number().min(1).max(100).optional().default(10),
      cursor: z.number().min(1).optional().nullish(),
    }),
  )
  .query(async ({ ctx, input }) => {
    return await ctx.db.user.findFirst({
      where: { email: input.email },
      include: {
        following: true,
        followers: true,
        posts: {
          take: input.limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          orderBy: { createdAt: "desc" },
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
  });
