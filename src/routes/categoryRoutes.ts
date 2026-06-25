// ─────────────────────────────────────────────────────────
//  CATEGORY ROUTES
//  Handles all endpoints related to categories.
//  Same pattern as userRoutes.ts Router + pool + export.
// ─────────────────────────────────────────────────────────

import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// ─── GET /  →  Get all categories ───────────────────────
router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM category");
  res.json(rows);
});

// ─── POST /  →  Create a new category ──────────────────
router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  const [result]: any = await pool.query(
    "INSERT INTO category (name) VALUES (?)",
    [name]
  );

  res.status(201).json({ id: result.insertId, name });
});

export default router;