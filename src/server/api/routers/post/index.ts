/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createTRPCRouter } from "~/server/api/trpc";
import { create, edit, getById, getLatest, getResponses } from "./procedures";

export const postRouter = createTRPCRouter({
  create,
  edit,
  getById,
  getLatest,
  getResponses,
});
