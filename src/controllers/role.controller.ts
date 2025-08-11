import { Request, Response } from "express";
import * as roleService from "../services/role.service";
import { createRoleSchema, updateRoleSchema } from "../schemas/role.schema";

export const createRole = async (req: Request, res: Response) => {
  try {
    const validatedData = createRoleSchema.parse(req.body);
    const role = await roleService.createRole(validatedData);
    res.status(201).json(role);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid role id" });
    const role = await roleService.getRoleById(id);
    res.json(role);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid role id" });
    const validatedData = updateRoleSchema.parse(req.body);
    const role = await roleService.updateRole(id, validatedData);
    res.json(role);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid role id" });
    const result = await roleService.deleteRole(id);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
