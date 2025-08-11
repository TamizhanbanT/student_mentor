import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const createRole = async (data: { name: string }) => {
  try {
    const role = await prisma.role.create({
      data,
    });
    return role;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("Role name must be unique");
    }
    throw new Error(`Failed to create role: ${error}`);
  }
};

export const getAllRoles = async () => {
  try {
    return await prisma.role.findMany();
  } catch (error) {
    throw new Error(`Failed to get roles: ${error}`);
  }
};

export const getRoleById = async (id: number) => {
  try {
    const role = await prisma.role.findUnique({ where: { id } });
    if (!role) throw new Error("Role not found");
    return role;
  } catch (error) {
    throw new Error(`Failed to get role: ${error}`);
  }
};

export const updateRole = async (id: number, data: { name?: string }) => {
  try {
    const updatedRole = await prisma.role.update({
      where: { id },
      data,
    });
    return updatedRole;
  } catch (error) {
    throw new Error(`Failed to update role: ${error}`);
  }
};

export const deleteRole = async (id: number) => {
  try {
    await prisma.role.delete({ where: { id } });
    return { message: "Role deleted successfully" };
  } catch (error) {
    throw new Error(`Failed to delete role: ${error}`);
  }
};
