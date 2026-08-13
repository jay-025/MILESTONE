import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setMessage("Email is required.");
      return;
    }

    if (!cleanEmail.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setMessage("Password is required.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3002/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem(
          "token",
          data.token
        );

        sessionStorage.setItem(
          "role",
          data.role
        );

        navigate("/dashboard");
      } else {
        setMessage(
          data.error ||
            data.message ||
            "Login failed"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>EventManager</h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
          }}
        >
          Sign in to manage your events
        </p>

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            maxLength="100"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        {message && (
          <p className="message">{message}</p>
        )}

        <div className="auth-link">
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;