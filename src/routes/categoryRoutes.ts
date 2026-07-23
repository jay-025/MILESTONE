// ─────────────────────────────────────────────────────────
//  CATEGORY ROUTES
//  Handles all endpoints related to categories.
//  Same pattern as userRoutes.ts Router + pool + export.
// ─────────────────────────────────────────────────────────

import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET all categories
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM category");

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting categories:", error);

    res.status(500).json({
      error: "Failed to get categories",
    });
  }
});

// CREATE category
router.post("/", async (req: Request, res: Response) => {
  try {
    const { category_id, name, description, status } = req.body;

    if (!category_id || !name || !description || !status) {
      res.status(400).json({
        error: "category_id, name, description, and status are required",
      });
      return;
    }

    await pool.query(
      `INSERT INTO category
       (category_id, name, description, status)
       VALUES (?, ?, ?, ?)`,
      [category_id, name, description, status]
    );

    res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);

    res.status(500).json({
      error: "Failed to create category",
    });
  }
});

// UPDATE category
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.id);
    const { name, description, status } = req.body;

    if (Number.isNaN(categoryId)) {
      res.status(400).json({
        error: "Category ID must be a number",
      });
      return;
    }

    if (!name || !description || !status) {
      res.status(400).json({
        error: "name, description, and status are required",
      });
      return;
    }

    const [result]: any = await pool.query(
      `UPDATE category
       SET name = ?, description = ?, status = ?
       WHERE category_id = ?`,
      [name, description, status, categoryId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Category not found",
      });
      return;
    }

    res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);

    res.status(500).json({
      error: "Failed to update category",
    });
  }
});

// DELETE category
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.id);

    if (Number.isNaN(categoryId)) {
      res.status(400).json({
        error: "Category ID must be a number",
      });
      return;
    }

    const [result]: any = await pool.query(
      "DELETE FROM category WHERE category_id = ?",
      [categoryId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Category not found",
      });
      return;
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);

    res.status(500).json({
      error: "Failed to delete category",
    });
  }
});

export default router;