import pool from "../db";

// GET all events
export const getAllEvents = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM `events`"
  );

  return rows;
};

// CREATE event
export const createEvent = async (
  idevents: number,
  name: string,
  type: string | null,
  date: string,
  location: string,
  description: string,
  ticketPrice: number | null,
  categoryId: number
) => {
  await pool.query(
    `INSERT INTO events
     (idevents, name, type, date, location, description, ticket_price, category_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      idevents,
      name,
      type,
      date,
      location,
      description,
      ticketPrice,
      categoryId,
    ]
  );
};

// UPDATE event
export const updateEvent = async (
  eventId: number,
  name: string,
  type: string | null,
  date: string,
  location: string,
  description: string,
  ticketPrice: number | null,
  categoryId: number
) => {
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
      type,
      date,
      location,
      description,
      ticketPrice,
      categoryId,
      eventId,
    ]
  );

  return result;
};

// DELETE event
export const deleteEvent = async (eventId: number) => {
  const [result]: any = await pool.query(
    "DELETE FROM events WHERE idevents = ?",
    [eventId]
  );

  return result;
};