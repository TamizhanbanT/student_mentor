import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(2, "Role name should be at least 2 characters"),
});

export const updateRoleSchema = z.object({
  name: z.string().min(2, "Role name should be at least 2 characters").optional(),
});
