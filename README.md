A web application that helps users discover local events happening in their area. 
Users can browse, search, and filter events based on categories such as entertainment, sports, community activities, shopping events, concerts, plays, festivals, charity events, and public gatherings.
The application will provide event details including date, time, location, category, and description.




Group Members:
Jay Mahida (8877504)
Harkeerat (9044234)


Tech Stack:
Database: MySQL
Frontend - HTML/CSS/JavaScript
Backend - TypeScript + Express.js


API Endpoints

•	GET /users — Get all users (admin)
•	GET /users/:id — Get user by ID
•	PATCH /users/:id — Update user profile
•	DELETE /users/:id — Delete user (admin)
•	GET /events — Get all events
•	GET /events/:id — Get event by ID
•	GET /events?category=concert — Filter events by category
•	POST /events — Create a new event (admin)
•	PATCH /events/:id — Update an event (admin)
•	DELETE /events/:id — Delete an event (admin)
•	GET /categories — Get all categories
•	GET /categories/:id — Get category by ID
•	POST /categories — Create a category (admin)
•	PATCH /categories/:id — Update a category (admin)
•	DELETE /categories/:id — Delete a category (admin)
•	POST /saved-events — Save an event for the logged in user
•	GET /saved-events — Get all saved events for the logged in user
•	DELETE /saved-events/:eventId — Remove a saved event
