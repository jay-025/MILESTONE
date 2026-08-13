import { Link } from "react-router-dom";

function Dashboard() {
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="page-container">

      {/* WEBSITE HEADER */}
      <div className="website-header">
        <div className="website-logo">🎉</div>

        <div>
          <h1 className="website-name">EventMANAGER</h1>

          <p className="website-tagline">
            Discover. Manage. Celebrate.
          </p>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="dashboard-card">

        <h2>Welcome to EventManager</h2>

        <p>
          Your Event Management System
        </p>

        <p>
          Manage events, categories, and users from one convenient place.
        </p>

        {/* NAVIGATION */}
        <div className="dashboard-links">

          <Link
            className="dashboard-link"
            to="/events"
          >
             Events
          </Link>

          <Link
            className="dashboard-link"
            to="/categories"
          >
             Categories
          </Link>

          {/* USERS ONLY AVAILABLE TO ADMIN */}
          {role === "admin" && (
            <Link
              className="dashboard-link"
              to="/users"
            >
               Users
            </Link>
          )}

        </div>

        {/* USER ROLE */}
        <div className="dashboard-info">

          <p>
            Logged in as:
            {" "}
            <strong>
              {role === "admin" ? "Administrator" : "User"}
            </strong>
          </p>

        </div>

        {/* LOGOUT */}
        <button
          className="logout-button"
          onClick={handleLogout}
        >
           Logout
        </button>

      </div>

      {/* FOOTER */}
      <div className="dashboard-footer">
        <p>
          EventManager © 2026 | Event Management System
        </p>
      </div>

    </div>
  );
}

export default Dashboard;