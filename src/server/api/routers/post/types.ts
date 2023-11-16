import { type inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { type postRouter } from ".";

export const referenceSchema = z.object({
  display: z.string().min(1),
  url: z.string().min(1).url().optional(),
});

export const tagSchema = z.object({
  tag: z.string().min(1),
});

export const createPostSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional().nullish(),
  body: z.string().min(300),
  references: z.array(referenceSchema).optional(),
  tags: z.array(tagSchema).optional(),
  responseTo: z.number().min(1).optional().nullish(),
  draft: z.boolean().optional().default(false),
});

export const updatePostSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1).optional(),
  subtitle: z.string().min(1).optional().nullish(),
  body: z.string().min(300).optional(),
  references: z.array(referenceSchema).optional(),
  tags: z.array(tagSchema).optional(),
});

export const getLatestSchema = z.object({
  limit: z.number().min(1).max(100).optional().default(10),
  cursor: z.number().min(1).optional().nullish(),
});

export const getPostByIdSchema = z.object({
  id: z.number().min(1),
});

export type GetLatestOutput = inferProcedureOutput<typeof postRouter.getLatest>;
export type QueryPostOutput = inferProcedureOutput<typeof postRouter.getById>;

export type CreatePost = z.infer<typeof createPostSchema>;
export type CreateReference = z.infer<typeof referenceSchema>;
