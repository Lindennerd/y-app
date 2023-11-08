import { z } from "zod";

export const likePostSchema = z.object({
  postId: z.number(),
});
