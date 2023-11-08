import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  createPostSchema,
  getLatestSchema,
  getPostByIdSchema,
  updatePostSchema,
} from "./types";

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
  getPost: protectedProcedure
    .input(getPostByIdSchema)
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: { id: input.id },
        include: {
          createdBy: {
            select: {
              name: true,
              image: true,
            },
          },
          likes: true,
          comments: true,
          tags: true,
          references: true,
        },
      });

      return post;
    }),

  getLatest: protectedProcedure
    .input(getLatestSchema)
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { id: ctx.session.user.id },
        select: {
          following: {
            select: {
              id: true,
            },
          },
        },
      });

      const posts = await ctx.db.post.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          references: true,
          tags: true,
          likes: true,
          comments: true,
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
          createdBy: {
            OR: [
              {
                following: {
                  every: {
                    id: {
                      in:
                        user?.following.map((user) => user.id as number) ?? [],
                    },
                  },
                },
              },
              {
                id: ctx.session.user.id,
              },
            ],
          },
        },
      });

      return {
        posts: posts.slice(0, input.limit),
        nextCursor: posts.length > input.limit ? posts[input.limit]?.id : null,
      };
    }),
});
