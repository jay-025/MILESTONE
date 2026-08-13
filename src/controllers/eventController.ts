import { Request, Response } from "express";

import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../models/eventModel";

// GET all events
export const getEvents = async (
  _req: Request,
  res: Response
) => {
  try {
    const events = await getAllEvents();

    res.status(200).json(events);
  } catch (error) {
    console.error("Error getting events:", error);

    res.status(500).json({
      error: "Failed to get events",
    });
  }
};

// CREATE event
export const addEvent = async (
  req: Request,
  res: Response
) => {
  try {
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

    await createEvent(
      idevents,
      name,
      type || null,
      date,
      location,
      description,
      ticket_price || null,
      category_id
    );

    res.status(201).json({
      message: "Event created successfully",
    });
  } catch (error) {
    console.error("Error creating event:", error);

    res.status(500).json({
      error: "Failed to create event",
    });
  }
};

// UPDATE event
export const editEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const eventId = Number(req.params.id);

    const {
      name,
      type,
      date,
      location,
      description,
      ticket_price,
      category_id,
    } = req.body;

    if (Number.isNaN(eventId)) {
      res.status(400).json({
        error: "Event ID must be a number",
      });
      return;
    }

    if (
      !name ||
      !date ||
      !location ||
      !description ||
      !category_id
    ) {
      res.status(400).json({
        error:
          "name, date, location, description, and category_id are required",
      });
      return;
    }

    const result = await updateEvent(
      eventId,
      name,
      type || null,
      date,
      location,
      description,
      ticket_price || null,
      category_id
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Event not found",
      });
      return;
    }

    res.status(200).json({
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error("Error updating event:", error);

    res.status(500).json({
      error: "Failed to update event",
    });
  }
};

// DELETE event
export const removeEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const eventId = Number(req.params.id);

    if (Number.isNaN(eventId)) {
      res.status(400).json({
        error: "Event ID must be a number",
      });
      return;
    }

    const result = await deleteEvent(eventId);

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Event not found",
      });
      return;
    }

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);

    res.status(500).json({
      error: "Failed to delete event",
    });
  }
};