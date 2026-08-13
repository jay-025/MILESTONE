import { Router } from "express";

import authenticateToken from "../middleware/auth";
import adminOnly from "../middleware/admin";

import {
  getEvents,
  addEvent,
  editEvent,
  removeEvent,
} from "../controllers/eventController";

const router = Router();

router.get("/", authenticateToken, getEvents);

router.post("/", authenticateToken, addEvent);

router.patch(
  "/:id",
  authenticateToken,
  adminOnly,
  editEvent
);

router.delete(
  "/:id",
  authenticateToken,
  adminOnly,
  removeEvent
);

export default router;