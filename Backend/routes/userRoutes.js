import express from "express";
import { logoutUser, createOrGetUser , getAllUser , getUserProfile} from "../controller/userController.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, createOrGetUser);
router.get("/", verifyFirebaseToken, getUserProfile);
router.get("/all", verifyFirebaseToken, getAllUser);
router.post("/logout", verifyFirebaseToken,logoutUser);

export default router; 
