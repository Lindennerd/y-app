import { type inferProcedureOutput } from "@trpc/server";
import { createTRPCRouter } from "../../trpc";
import { getProfile } from "./procedures/getProfile";

export const userRouter = createTRPCRouter({
  getProfile,
});

export type ProfileQuery = inferProcedureOutput<typeof userRouter.getProfile>;
