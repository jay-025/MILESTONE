import { Router } from "express";

import authenticateToken from "../middleware/auth";

import {
  getCategories,
  addCategory,
  editCategory,
  removeCategory,
} from "../controllers/categoryController";

const router = Router();

router.get("/", authenticateToken, getCategories);

router.post("/", authenticateToken, addCategory);

router.patch("/:id", authenticateToken, editCategory);

router.delete("/:id", authenticateToken, removeCategory);

export default router;