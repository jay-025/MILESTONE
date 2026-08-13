import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  const [idevents, setIdevents] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateType, setUpdateType] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateTicketPrice, setUpdateTicketPrice] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const refreshEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/events",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEvents(data);
      } else {
        showMessage(
          data.error ||
            data.message ||
            "Failed to get events.",
          "error"
        );
      }
    } catch (error) {
      console.error("Get events error:", error);

      showMessage(
        "Unable to connect to the server.",
        "error"
      );
    }
  };

 
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/events",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEvents(data);
        } else {
          setMessage(
            data.error ||
              data.message ||
              "Failed to get events."
          );

          setMessageType("error");
        }
      } catch (error) {
        console.error("Get events error:", error);

        setMessage(
          "Unable to connect to the server."
        );

        setMessageType("error");
      }
    };

    loadEvents();
  }, [token]);

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanType = type.trim();
    const cleanLocation = location.trim();
    const cleanDescription = description.trim();

    // VALIDATION

    if (!idevents || Number(idevents) <= 0) {
      showMessage(
        "Event ID must be greater than 0.",
        "error"
      );
      return;
    }

    if (cleanName.length < 2) {
      showMessage(
        "Event name must contain at least 2 characters.",
        "error"
      );
      return;
    }

    if (!date) {
      showMessage(
        "Please select an event date.",
        "error"
      );
      return;
    }

    if (cleanLocation.length < 2) {
      showMessage(
        "Location must contain at least 2 characters.",
        "error"
      );
      return;
    }

    if (cleanDescription.length < 3) {
      showMessage(
        "Description must contain at least 3 characters.",
        "error"
      );
      return;
    }

    if (
      ticketPrice !== "" &&
      Number(ticketPrice) < 0
    ) {
      showMessage(
        "Ticket price cannot be negative.",
        "error"
      );
      return;
    }

    if (!categoryId || Number(categoryId) <= 0) {
      showMessage(
        "Category ID must be greater than 0.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3002/events",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            idevents: Number(idevents),
            name: cleanName,
            type: cleanType || null,
            date,
            location: cleanLocation,
            description: cleanDescription,

            ticket_price:
              ticketPrice === ""
                ? null
                : Number(ticketPrice),

            category_id: Number(categoryId),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage(
          "Event added successfully!",
          "success"
        );

        // Clear form
        setIdevents("");
        setName("");
        setType("");
        setDate("");
        setLocation("");
        setDescription("");
        setTicketPrice("");
        setCategoryId("");

        // Refresh event list
        await refreshEvents();
      } else {
        showMessage(
          data.error ||
            data.message ||
            "Failed to add event.",
          "error"
        );
      }
    } catch (error) {
      console.error("Add event error:", error);

      showMessage(
        "Unable to connect to the server.",
        "error"
      );
    }
  };


  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    const cleanName = updateName.trim();
    const cleanType = updateType.trim();
    const cleanLocation =
      updateLocation.trim();
    const cleanDescription =
      updateDescription.trim();

    if (!updateId || Number(updateId) <= 0) {
      showMessage(
        "Please enter a valid Event ID.",
        "error"
      );
      return;
    }

    if (cleanName.length < 2) {
      showMessage(
        "Event name must contain at least 2 characters.",
        "error"
      );
      return;
    }

    if (!updateDate) {
      showMessage(
        "Please select an event date.",
        "error"
      );
      return;
    }

    if (cleanLocation.length < 2) {
      showMessage(
        "Location must contain at least 2 characters.",
        "error"
      );
      return;
    }

    if (cleanDescription.length < 3) {
      showMessage(
        "Description must contain at least 3 characters.",
        "error"
      );
      return;
    }

    if (
      updateTicketPrice !== "" &&
      Number(updateTicketPrice) < 0
    ) {
      showMessage(
        "Ticket price cannot be negative.",
        "error"
      );
      return;
    }

    if (
      !updateCategoryId ||
      Number(updateCategoryId) <= 0
    ) {
      showMessage(
        "Category ID must be greater than 0.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/events/${updateId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: cleanName,
            type: cleanType || null,
            date: updateDate,
            location: cleanLocation,
            description: cleanDescription,

            ticket_price:
              updateTicketPrice === ""
                ? null
                : Number(updateTicketPrice),

            category_id:
              Number(updateCategoryId),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage(
          "Event updated successfully!",
          "success"
        );

        // Clear update form
        setUpdateId("");
        setUpdateName("");
        setUpdateType("");
        setUpdateDate("");
        setUpdateLocation("");
        setUpdateDescription("");
        setUpdateTicketPrice("");
        setUpdateCategoryId("");

        await refreshEvents();
      } else {
        showMessage(
          data.error ||
            data.message ||
            "Failed to update event.",
          "error"
        );
      }
    } catch (error) {
      console.error("Update event error:", error);

      showMessage(
        "Unable to connect to the server.",
        "error"
      );
    }
  };


  const handleDeleteEvent = async (e) => {
    e.preventDefault();

    if (!deleteId || Number(deleteId) <= 0) {
      showMessage(
        "Please enter a valid Event ID.",
        "error"
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete Event ID ${deleteId}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/events/${deleteId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage(
          "Event deleted successfully!",
          "success"
        );

        setDeleteId("");

        await refreshEvents();
      } else {
        showMessage(
          data.error ||
            data.message ||
            "Failed to delete event.",
          "error"
        );
      }
    } catch (error) {
      console.error("Delete event error:", error);

      showMessage(
        "Unable to connect to the server.",
        "error"
      );
    }
  };

 
  const handleEditClick = (event) => {
    setUpdateId(event.idevents);
    setUpdateName(event.name || "");
    setUpdateType(event.type || "");

    // MySQL date can contain time.
    // HTML date input needs YYYY-MM-DD.
    if (event.date) {
      setUpdateDate(
        String(event.date).substring(0, 10)
      );
    } else {
      setUpdateDate("");
    }

    setUpdateLocation(event.location || "");
    setUpdateDescription(
      event.description || ""
    );

    setUpdateTicketPrice(
      event.ticket_price ?? ""
    );

    setUpdateCategoryId(
      event.category_id ?? ""
    );

    setMessage("");
    setMessageType("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 
  return (
    <div className="events-page">
      <h1 className="events-title">
        🎫 Event Management
      </h1>

      <p className="page-subtitle">
        Create and manage events in EventManager.
      </p>

      {/* MESSAGE */}

      {message && (
        <div
          className={
            messageType === "success"
              ? "message success-message"
              : "message error-message"
          }
        >
          {message}
        </div>
      )}


      <div className="event-form-card">
        <h2>➕ Add Event</h2>

        <form
          className="event-form"
          onSubmit={handleAddEvent}
        >
          <input
            type="number"
            placeholder="Event ID"
            min="1"
            value={idevents}
            onChange={(e) =>
              setIdevents(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Event Name"
            minLength="2"
            maxLength="100"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Event Type"
            maxLength="50"
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Location"
            minLength="2"
            maxLength="100"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Description"
            minLength="3"
            maxLength="255"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Ticket Price"
            min="0"
            step="0.01"
            value={ticketPrice}
            onChange={(e) =>
              setTicketPrice(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Category ID"
            min="1"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="add-button"
          >
            Add Event
          </button>
        </form>
      </div>

  

      {role === "admin" && (
        <>
          {/* UPDATE EVENT */}

          <div className="event-form-card">
            <h2>✏️ Update Event</h2>

            <form
              className="event-form"
              onSubmit={handleUpdateEvent}
            >
              <input
                type="number"
                placeholder="Event ID to Update"
                min="1"
                value={updateId}
                onChange={(e) =>
                  setUpdateId(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="text"
                placeholder="Event Name"
                minLength="2"
                maxLength="100"
                value={updateName}
                onChange={(e) =>
                  setUpdateName(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="text"
                placeholder="Event Type"
                maxLength="50"
                value={updateType}
                onChange={(e) =>
                  setUpdateType(
                    e.target.value
                  )
                }
              />

              <input
                type="date"
                value={updateDate}
                onChange={(e) =>
                  setUpdateDate(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="text"
                placeholder="Location"
                minLength="2"
                maxLength="100"
                value={updateLocation}
                onChange={(e) =>
                  setUpdateLocation(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="text"
                placeholder="Description"
                minLength="3"
                maxLength="255"
                value={updateDescription}
                onChange={(e) =>
                  setUpdateDescription(
                    e.target.value
                  )
                }
                required
              />

              <input
                type="number"
                placeholder="Ticket Price"
                min="0"
                step="0.01"
                value={updateTicketPrice}
                onChange={(e) =>
                  setUpdateTicketPrice(
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="Category ID"
                min="1"
                value={updateCategoryId}
                onChange={(e) =>
                  setUpdateCategoryId(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="submit"
                className="update-button"
              >
                Update Event
              </button>
            </form>
          </div>

      

          <div className="event-form-card">
            <h2>🗑️ Delete Event</h2>

            <form
              className="delete-form"
              onSubmit={handleDeleteEvent}
            >
              <input
                type="number"
                placeholder="Event ID to Delete"
                min="1"
                value={deleteId}
                onChange={(e) =>
                  setDeleteId(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="submit"
                className="delete-button"
              >
                Delete Event
              </button>
            </form>
          </div>
        </>
      )}

      <div className="card">
        <h2>📋 Event List</h2>

        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="events-list">
            {events.map((event) => (
              <div
                className="event-card"
                key={event.idevents}
              >
                <h3>
                  🎉 {event.name}
                </h3>

                <p>
                  <strong>
                    Event ID:
                  </strong>{" "}
                  {event.idevents}
                </p>

                <p>
                  <strong>
                    Type:
                  </strong>{" "}
                  {event.type || "N/A"}
                </p>

                <p>
                  <strong>
                    Date:
                  </strong>{" "}
                  {event.date
                    ? String(
                        event.date
                      ).substring(0, 10)
                    : "N/A"}
                </p>

                <p>
                  <strong>
                    Location:
                  </strong>{" "}
                  {event.location}
                </p>

                <p>
                  <strong>
                    Description:
                  </strong>{" "}
                  {event.description}
                </p>

                <p>
                  <strong>
                    Ticket Price:
                  </strong>{" "}
                  {event.ticket_price !==
                    null &&
                  event.ticket_price !==
                    undefined
                    ? `$${Number(
                        event.ticket_price
                      ).toFixed(2)}`
                    : "N/A"}
                </p>

                <p>
                  <strong>
                    Category ID:
                  </strong>{" "}
                  {event.category_id}
                </p>

                {role === "admin" && (
                  <button
                    type="button"
                    className="update-button"
                    onClick={() =>
                      handleEditClick(event)
                    }
                  >
                    Edit Event
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;