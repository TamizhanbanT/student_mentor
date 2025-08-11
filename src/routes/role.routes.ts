import { Router } from "express";
import * as roleController from "../controllers/role.controller";

const router = Router();

router.post("/", roleController.createRole);
router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

export default router;
