import { Router } from "express";

import authenticateToken from "../middleware/auth";
import adminOnly from "../middleware/admin";

import {
  getUsers,
  addUser,
  editUser,
  removeUser,
  registerUser,
  loginUser,
} from "../controllers/userController";

const router = Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin only
router.get("/", authenticateToken, adminOnly, getUsers);

router.post("/", authenticateToken, adminOnly, addUser);

router.patch(
  "/:id",
  authenticateToken,
  adminOnly,
  editUser
);

router.delete(
  "/:id",
  authenticateToken,
  adminOnly,
  removeUser
);

export default router;