// ─────────────────────────────────────────────────────────
//  EVENTS ROUTES
//  This file handles ALL endpoints related to events.
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

// ─── GET /  →  Get all events ──────────────────────────
// Notice: we write "/" not "/events".
// The "/events" prefix will be added in index.ts when we register this router.
// So "/" here becomes "/events" in the final API.
router.get("/", async (_req: Request, res: Response) => {
  // Query the database for all events.
  const [rows] = await pool.query("SELECT * FROM `events`");

  // Send the results back as JSON.
  res.json(rows);
});

// ─── POST /  →  Create a new event ─────────────────────
// Again, "/" here becomes "/events" because of the prefix in index.ts.
router.post("/", async (req: Request, res: Response) => {
  // Get the name from the request body (sent as JSON by the frontend).
  const { name } = req.body;

  // Validate: don't allow empty names.
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  // Insert into the database. The ? prevents SQL injection.
  const [result]: any = await pool.query(
    "INSERT INTO events (name) VALUES (?)",
    [name]
  );
  

  // Respond with the newly created event, including the auto-generated ID.
  res.status(201).json({ id: result.insertId, name });
});

// Export the router so index.ts can import and register it.
export default router;