import express from "express";
const router = express.Router();
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import {
  createTeam,
  getMyTeams,
  getTeamById,
  addMember,
  removeMember,
  promoteToManager,
  getNonAdminMembers,
  getNonMembersOfTeam 
} from "../controller/teamController.js";

router.use(verifyFirebaseToken);
router.post("/", createTeam);
router.get("/", getMyTeams);
router.get("/:id", getTeamById);
router.put("/:teamId/add", addMember);
router.delete("/:teamId/remove/:userId", removeMember);
router.put("/:teamId/promote/:userId", promoteToManager);

router.get("/:teamId/non-admin-members", getNonAdminMembers);
router.get("/:teamId/non-members", getNonMembersOfTeam);


export default router;
