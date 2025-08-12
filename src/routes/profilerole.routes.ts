import { Router } from "express";
import * as profileRoleController from "../controllers/profilerole.controller";
import { isAuthenticated, isAdmin } from "../middlewares/auth";

const router = Router();

router.post("/", isAuthenticated, isAdmin, profileRoleController.createProfileRole);
router.get("/profile/:profileId", isAuthenticated, profileRoleController.getProfileWithRoles);
router.get("/roles-with-profiles", isAuthenticated, profileRoleController.getAllRolesWithProfiles);
router.put("/:oldProfileId/:oldRoleId", isAuthenticated, isAdmin, profileRoleController.updateProfileRole);
router.delete("/:profileId/:roleId", isAuthenticated, isAdmin, profileRoleController.deleteProfileRole);

export default router;
