// ─────────────────────────────────────────────────────────
//  USER ROUTES
//  This file handles ALL endpoints related to users.
//  It uses express.Router() instead of the main app.
// ─────────────────────────────────────────────────────────

// Import Router and types from express.
// Router is a mini-application that can have its own routes.
import { Router, Request, Response } from "express";

// Import the shared database pool from db.ts.
// "../db" means "go up one folder (from routes/ to src/) and find db.ts".
import pool from "../db";

// Create a new Router instance.
// This works exactly like "app" but is designed to be plugged into the main app later.
const router = Router();

// ─── GET /  →  Get all users ──────────────────────────
// Notice: we write "/" not "/users".
// The "/users" prefix will be added in index.ts when we register this router.
// So "/" here becomes "/users" in the final API.
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting users:", error);

    res.status(500).json({
      error: "Failed to get users",
    });
  }
});

// ─── POST /  →  Create a new user ─────────────────────
// Again, "/" here becomes "/users" because of the prefix in index.ts.
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idUser, fullName, email, role, phone } = req.body;

    if (!idUser || !fullName || !email) {
      res.status(400).json({
        error: "idUser, fullName, and email are required",
      });
      return;
    }

    await pool.query(
      `INSERT INTO user
       (idUser, fullName, email, role, phone)
       VALUES (?, ?, ?, ?, ?)`,
      [idUser, fullName, email, role || null, phone || null]
    );

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);

    res.status(500).json({
      error: "Failed to create user",
    });
  }
});

// ─── PATCH /:id  →  Update a user by ID ───────────────
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const { fullName, email, role, phone } = req.body;

    if (Number.isNaN(userId)) {
      res.status(400).json({
        error: "User ID must be a number",
      });
      return;
    }

    if (!fullName || !email) {
      res.status(400).json({
        error: "fullName and email are required",
      });
      return;
    }

    const [result]: any = await pool.query(
      `UPDATE user
       SET fullName = ?, email = ?, role = ?, phone = ?
       WHERE idUser = ?`,
      [fullName, email, role || null, phone || null, userId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);

    res.status(500).json({
      error: "Failed to update user",
    });
  }
});

// ─── DELETE /:id  →  Delete a user by ID ───────────────
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      res.status(400).json({
        error: "User ID must be a number",
      });
      return;
    }

    const [result]: any = await pool.query(
      "DELETE FROM user WHERE idUser = ?",
      [userId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    res.status(500).json({
      error: "Failed to delete user",
    });
  }
});


// Export the router so index.ts can import and register it.
export default router;