import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [idUser, setIdUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (cleanName.length < 2) {
      setMessage("Full name must be at least 2 characters.");
      return;
    }

    if (!cleanEmail.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (cleanPhone && !/^\d{10}$/.test(cleanPhone)) {
      setMessage("Phone number must contain exactly 10 digits.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setMessage("Password must contain an uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setMessage("Password must contain a lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setMessage("Password must contain a number.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3002/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUser: Number(idUser),
            fullName: cleanName,
            email: cleanEmail,
            phone: cleanPhone || null,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful.");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(
          data.error ||
            data.message ||
            "Registration failed"
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
        <h1>Create Account</h1>

        <form
          className="auth-form"
          onSubmit={handleRegister}
        >
          <input
            type="number"
            placeholder="User ID"
            value={idUser}
            onChange={(e) => setIdUser(e.target.value)}
            min="1"
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            minLength="2"
            maxLength="45"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength="100"
            required
          />

          <input
            type="tel"
            placeholder="Phone - 10 digits"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}"
            title="Phone number must contain exactly 10 digits"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
            title="Password must be at least 8 characters and contain uppercase, lowercase, and a number"
            required
          />

          <button
            className="add-button"
            type="submit"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="message">{message}</p>
        )}

        <div className="auth-link">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;