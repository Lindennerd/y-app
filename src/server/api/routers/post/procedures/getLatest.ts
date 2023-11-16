import { publicProcedure } from "~/server/api/trpc";
import { getLatestSchema } from "../types";

export const getLatest = publicProcedure
  .input(getLatestSchema)
  .query(async ({ ctx, input }) => {
    const user = ctx.session
      ? await ctx.db.user.findFirst({
          where: { id: ctx.session.user.id },
          select: {
            following: {
              select: {
                id: true,
              },
            },
          },
        })
      : null;

    const posts = await ctx.db.post.findMany({
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
      where: {
        draft: false,
        createdBy: {
          OR: [
            {
              following: {
                every: {
                  id: {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    in: user?.following.map((user) => user.id) ?? [],
                  },
                },
              },
            },
            {
              id: ctx.session?.user.id ?? "",
            },
          ],
        },
      },
    });

    return {
      posts: posts.slice(0, input.limit),
      nextCursor: posts.length > input.limit ? posts[input.limit]?.id : null,
    };
  });
