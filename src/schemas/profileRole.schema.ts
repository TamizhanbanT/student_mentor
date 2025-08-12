
import { z } from "zod";

export const createProfileRoleSchema = z.object({
  profileId: z.number().int().positive(),
  roleId: z.number().int().positive(),
});

export const updateProfileRoleSchema = z.object({
  profileId: z.number().int().positive(),
  roleId: z.number().int().positive(),
});

export type CreateProfileRoleInput = z.infer<typeof createProfileRoleSchema>;
export type UpdateProfileRoleInput = z.infer<typeof updateProfileRoleSchema>;
