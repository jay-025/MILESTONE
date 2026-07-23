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
  try {
    // Query the database for all events.
    const [rows] = await pool.query("SELECT * FROM events");

    // Send the results back as JSON.
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting events:", error);

    res.status(500).json({
      error: "Failed to get events",
    });
  }
});

// ─── POST /  →  Create a new event ─────────────────────
// Again, "/" here becomes "/events" because of the prefix in index.ts.
router.post("/", async (req: Request, res: Response) => {
  try {
    // Get the event information from the request body.
    const {
      idevents,
      name,
      type,
      date,
      location,
      description,
      ticket_price,
      category_id,
    } = req.body;

    // Validate the required fields.
    if (
      !idevents ||
      !name ||
      !date ||
      !location ||
      !description ||
      !category_id
    ) {
      res.status(400).json({
        error:
          "idevents, name, date, location, description, and category_id are required",
      });
      return;
    }

    // Insert into the database. The ? placeholders prevent SQL injection.
    await pool.query(
      `INSERT INTO events
       (idevents, name, type, date, location, description, ticket_price, category_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        idevents,
        name,
        type || null,
        date,
        location,
        description,
        ticket_price || null,
        category_id,
      ]
    );

    // Respond with a success message.
    res.status(201).json({
      message: "Event created successfully",
    });
  } catch (error) {
    console.error("Error creating event:", error);

    res.status(500).json({
      error: "Failed to create event",
    });
  }
});

// ─── PATCH /:id  →  Update an existing event ───────────
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    // Get the event ID from the URL.
    const eventId = Number(req.params.id);

    // Get the updated event information from the request body.
    const {
      name,
      type,
      date,
      location,
      description,
      ticket_price,
      category_id,
    } = req.body;

    // Validate the event ID.
    if (Number.isNaN(eventId)) {
      res.status(400).json({
        error: "Event ID must be a number",
      });
      return;
    }

    // Validate the required fields.
    if (!name || !date || !location || !description || !category_id) {
      res.status(400).json({
        error:
          "name, date, location, description, and category_id are required",
      });
      return;
    }

    // Update the matching event.
    const [result]: any = await pool.query(
      `UPDATE events
       SET name = ?,
           type = ?,
           date = ?,
           location = ?,
           description = ?,
           ticket_price = ?,
           category_id = ?
       WHERE idevents = ?`,
      [
        name,
        type || null,
        date,
        location,
        description,
        ticket_price || null,
        category_id,
        eventId,
      ]
    );

    // Return 404 if the event ID was not found.
    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Event not found",
      });
      return;
    }

    // Respond with a success message.
    res.status(200).json({
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error("Error updating event:", error);

    res.status(500).json({
      error: "Failed to update event",
    });
  }
});

// ─── DELETE /:id  →  Delete an event ───────────────────
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    // Get the event ID from the URL.
    const eventId = Number(req.params.id);

    // Validate the event ID.
    if (Number.isNaN(eventId)) {
      res.status(400).json({
        error: "Event ID must be a number",
      });
      return;
    }

    // Delete the matching event.
    const [result]: any = await pool.query(
      "DELETE FROM events WHERE idevents = ?",
      [eventId]
    );

    // Return 404 if the event ID was not found.
    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Event not found",
      });
      return;
    }

    // Respond with a success message.
    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);

    res.status(500).json({
      error: "Failed to delete event",
    });
  }
});

// Export the router so index.ts can import and register it.
export default router;