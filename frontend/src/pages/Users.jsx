import { useEffect, useState } from "react";

function Users() {
  
  
  const [users, setUsers] = useState([]);


  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  const [updateId, setUpdateId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");


  const [deleteId, setDeleteId] = useState("");

  // JWT token
  const token = sessionStorage.getItem("token");


  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };


  const refreshUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        showMessage(
          data.error ||
            data.message ||
            "Failed to get users",
          "error"
        );
      }
    } catch (error) {
      console.error("Get users error:", error);

      showMessage(
        "Unable to connect to the server.",
        "error"
      );
    }
  };

  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUsers(data);
        } else {
          setMessage(
            data.error ||
              data.message ||
              "Failed to get users"
          );

          setMessageType("error");
        }
      } catch (error) {
        console.error("Get users error:", error);

        setMessage(
          "Unable to connect to the server."
        );

        setMessageType("error");
      }
    };

    loadUsers();
  }, [token]);

  
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    // Remove unnecessary spaces
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

   

    if (!updateId || Number(updateId) <= 0) {
      showMessage(
        "Please enter a valid User ID.",
        "error"
      );
      return;
    }

    if (cleanName.length < 2) {
      showMessage(
        "Full name must contain at least 2 characters.",
        "error"
      );
      return;
    }

    // Name allows letters, spaces, apostrophe and hyphen
    const nameRegex = /^[A-Za-zÀ-ÿ' -]+$/;

    if (!nameRegex.test(cleanName)) {
      showMessage(
        "Full name can only contain letters, spaces, apostrophes, and hyphens.",
        "error"
      );
      return;
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      showMessage(
        "Please enter a valid email address.",
        "error"
      );
      return;
    }

    if (role !== "user" && role !== "admin") {
      showMessage(
        "Please select a valid role.",
        "error"
      );
      return;
    }

    // Phone is optional
    // If entered, must contain 10 digits
    if (
      cleanPhone &&
      !/^\d{10}$/.test(cleanPhone)
    ) {
      showMessage(
        "Phone number must contain exactly 10 digits.",
        "error"
      );
      return;
    }



    try {
      const response = await fetch(
        `http://localhost:3002/users/${updateId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            fullName: cleanName,
            email: cleanEmail,
            role: role,
            phone: cleanPhone || null,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage(
          "User updated successfully!",
          "success"
        );

        // Clear form
        setUpdateId("");
        setFullName("");
        setEmail("");
        setRole("");
        setPhone("");

        // Refresh list WITHOUT page reload
        await refreshUsers();
      } else {
        showMessage(
          data.error ||
            data.message ||
            "Failed to update user.",
          "error"
        );
      }
    } catch (error) {
      console.error("Update user error:", error);

      showMessage(
        "Unable to connect to the server.",
        "error"
      );
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();


    if (!deleteId || Number(deleteId) <= 0) {
      showMessage(
        "Please enter a valid User ID.",
        "error"
      );
      return;
    }

    // Confirmation before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete User ID ${deleteId}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/users/${deleteId}`,
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
          "User deleted successfully!",
          "success"
        );

        setDeleteId("");

        // Refresh users WITHOUT reloading page
        await refreshUsers();
      } else {
        showMessage(
          data.error ||
            data.message ||
            "Failed to delete user.",
          "error"
        );
      }
    } catch (error) {
      console.error("Delete user error:", error);

      showMessage(
        "Unable to connect to the server.",
        "error"
      );
    }
  };

  const handleEditClick = (user) => {
    setUpdateId(user.idUser);
    setFullName(user.fullName || "");
    setEmail(user.email || "");
    setRole(user.role || "user");
    setPhone(user.phone || "");

    setMessage("");
    setMessageType("");

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  
  return (
    <div className="page-container">
      <h1 className="page-title">
        👥 User Management
      </h1>

      <p className="page-subtitle">
        Manage registered users and administrator
        access.
      </p>

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

      

      <div className="card">
        <h2>✏️ Update User</h2>

        <form
          className="form-grid"
          onSubmit={handleUpdateUser}
        >
          <input
            type="number"
            placeholder="User ID"
            min="1"
            value={updateId}
            onChange={(e) =>
              setUpdateId(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            minLength="2"
            maxLength="100"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            maxLength="100"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            required
          >
            <option value="">
              Select Role
            </option>

            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <input
            type="tel"
            placeholder="Phone - 10 digits"
            maxLength="10"
            pattern="[0-9]{10}"
            title="Enter exactly 10 digits"
            value={phone}
            onChange={(e) => {
              // Allow numbers only
              const value =
                e.target.value.replace(
                  /\D/g,
                  ""
                );

              setPhone(value);
            }}
          />

          <button
            type="submit"
            className="update-button"
          >
            Update User
          </button>
        </form>
      </div>

  

      <div className="card">
        <h2>🗑️ Delete User</h2>

        <form
          className="form-grid"
          onSubmit={handleDeleteUser}
        >
          <input
            type="number"
            placeholder="User ID to Delete"
            min="1"
            value={deleteId}
            onChange={(e) =>
              setDeleteId(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="delete-button"
          >
            Delete User
          </button>
        </form>
      </div>

  

      <div className="card">
        <h2>📋 User List</h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="list-grid">
            {users.map((user) => (
              <div
                className="item-card"
                key={user.idUser}
              >
                <h3>
                  👤 {user.fullName}
                </h3>

                <p>
                  <strong>User ID:</strong>{" "}
                  {user.idUser}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {user.email}
                </p>

                <p>
                  <strong>Role:</strong>{" "}
                  {user.role || "user"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {user.phone || "N/A"}
                </p>

                <button
                  type="button"
                  className="update-button"
                  onClick={() =>
                    handleEditClick(user)
                  }
                >
                  Edit User
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export default Users;