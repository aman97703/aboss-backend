import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createUser,
  getCurrentUserProfile,
  loginUser,
  logoutCurrentUser,
  updateCurrentUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/auth", loginUser);
router.post("/signup", createUser);
router.post("/logout", logoutCurrentUser);
router.put("/profile", authenticate, updateCurrentUserProfile);
router.get("/current", authenticate, getCurrentUserProfile);

export default router;
