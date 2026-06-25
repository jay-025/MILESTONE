// ─────────────────────────────────────────────────────────
//  ENTRY POINT
//  This file creates the Express app, adds middleware,
//  registers route files, and starts the server.
//  It does NOT contain any route logic itself.
// ─────────────────────────────────────────────────────────

import express from "express";
import cors from "cors";

// Import route files.
// Each file exports a Router with its own set of endpoints.
import userRoutes from "./routes/userRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import categoryRoutes from "./routes/categoryRoutes";
// Create the Express application.
const app = express();

// ─── MIDDLEWARE ────────────────────────────────────────
// cors()         → allows requests from other origins (e.g. the React frontend)
// express.json() → parses JSON request bodies so req.body works
app.use(cors());
app.use(express.json());

// ─── REGISTER ROUTES ──────────────────────────────────
// app.use(PREFIX, ROUTER)
//
// This line says: "For any request that starts with /users,
// hand it off to the userRoutes router."
//
// Inside userRoutes.ts:
//   router.get("/")   → becomes  GET  /users
//   router.post("/")  → becomes  POST /users
//
app.use("/users", userRoutes);
app.use("/events", eventsRoutes);
app.use("/categories", categoryRoutes);
// ─── START SERVER ─────────────────────────────────────
app.listen(3002, () => {
  console.log("Server running on http://localhost:3002");
});