
import { Request, Response } from "express";
import * as profileRoleService from "../services/profilerole.service";
import { createProfileRoleSchema, updateProfileRoleSchema } from "../schemas/profileRole.schema";

export const createProfileRole = async (req: Request, res: Response) => {
  try {
    const { profileId, roleId } = createProfileRoleSchema.parse(req.body);
    const newEntry = await profileRoleService.createProfileRole(profileId, roleId);
    res.status(201).json({ message: "Role assigned to profile successfully", data: newEntry });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfileWithRoles = async (req: Request, res: Response) => {
  try {
    const profileId = Number(req.params.profileId);
    const data = await profileRoleService.getProfileWithRoles(profileId);
    if (!data) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRolesWithProfiles = async (_req: Request, res: Response) => {
  try {
    const data = await profileRoleService.getAllRolesWithProfiles();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfileRole = async (req: Request, res: Response) => {
  try {
    const oldProfileId = Number(req.params.oldProfileId);
    const oldRoleId = Number(req.params.oldRoleId);
    const { profileId: newProfileId, roleId: newRoleId } = updateProfileRoleSchema.parse(req.body);

    const updated = await profileRoleService.updateProfileRole(oldProfileId, oldRoleId, newProfileId, newRoleId);
    res.status(200).json({ message: "ProfileRole updated successfully", data: updated });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProfileRole = async (req: Request, res: Response) => {
  try {
    const profileId = Number(req.params.profileId);
    const roleId = Number(req.params.roleId);
    await profileRoleService.deleteProfileRole(profileId, roleId);
    res.status(200).json({ message: "ProfileRole deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
