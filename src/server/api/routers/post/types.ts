import { z } from "zod";

export const referenceSchema = z.object({
  display: z.string().min(1),
  url: z.string().min(1).url().optional(),
});

export const tagSchema = z.object({
  tag: z.string().min(1),
});

export const createPostSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1).optional().nullish(),
  body: z.string().min(300),
  references: z.array(referenceSchema).optional(),
  tags: z.array(tagSchema).optional(),
});

export const updatePostSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1).optional(),
  subtitle: z.string().min(1).optional().nullish(),
  body: z.string().min(300).optional(),
  references: z.array(referenceSchema).optional(),
  tags: z.array(tagSchema).optional(),
});

export type CreatePost = z.infer<typeof createPostSchema>;
export type CreateReference = z.infer<typeof referenceSchema>;
