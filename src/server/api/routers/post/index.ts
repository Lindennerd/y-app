/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createTRPCRouter } from "~/server/api/trpc";
import { create, edit, getById, getLatest, getResponses } from "./procedures";
import { publishPost } from "./procedures/publishPost";

export const postRouter = createTRPCRouter({
  create,
  edit,
  getById,
  getLatest,
  getResponses,
  publishPost,
});
