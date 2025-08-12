
import { prisma } from "../config/prisma";

export const createProfileRole = async (profileId: number, roleId: number) => {
  // Optionally, validate if Profile and Role exist
  const profile = await prisma.profile.findUnique({ where: { id: profileId } });
  if (!profile) throw new Error("Profile not found");

  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role) throw new Error("Role not found");

  // Create the relation entry
  return await prisma.profileRole.create({
    data: { profileId, roleId },
  });
};

export const getProfileWithRoles = async (profileId: number) => {
  return await prisma.profile.findUnique({
    where: { id: profileId },
    include: {
      profileRoles: {
        include: {
          role: true,
        },
      },
    },
  });
};

export const getAllRolesWithProfiles = async () => {
  return await prisma.role.findMany({
    include: {
      profileRoles: {
        include: {
          profile: true,
        },
      },
    },
  });
};

export const updateProfileRole = async (
  oldProfileId: number,
  oldRoleId: number,
  newProfileId: number,
  newRoleId: number
) => {
  return await prisma.profileRole.update({
    where: {
      profileId_roleId: {
        profileId: oldProfileId,
        roleId: oldRoleId,
      },
    },
    data: {
      profileId: newProfileId,
      roleId: newRoleId,
    },
  });
};

export const deleteProfileRole = async (profileId: number, roleId: number) => {
  return await prisma.profileRole.delete({
    where: {
      profileId_roleId: {
        profileId,
        roleId,
      },
    },
  });
};
