import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  getAllUsers,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from "../models/userModel";

// GET all users
export const getUsers = async (
  _req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);

    res.status(500).json({
      error: "Failed to get users",
    });
  }
};

// CREATE user - ADMIN
export const addUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      idUser,
      fullName,
      email,
      role,
      phone,
      password,
    } = req.body;

    if (!idUser || !fullName || !email || !password) {
      res.status(400).json({
        error:
          "idUser, fullName, email, and password are required",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await createUser(
      idUser,
      fullName,
      email,
      role || "user",
      phone || null,
      hashedPassword
    );

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);

    res.status(500).json({
      error: "Failed to create user",
    });
  }
};

// UPDATE user
export const editUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.id);

    const {
      fullName,
      email,
      role,
      phone,
    } = req.body;

    if (Number.isNaN(userId)) {
      res.status(400).json({
        error: "User ID must be a number",
      });
      return;
    }

    if (!fullName || !email) {
      res.status(400).json({
        error: "fullName and email are required",
      });
      return;
    }

    const result = await updateUser(
      userId,
      fullName,
      email,
      role || null,
      phone || null
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);

    res.status(500).json({
      error: "Failed to update user",
    });
  }
};

// DELETE user
export const removeUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      res.status(400).json({
        error: "User ID must be a number",
      });
      return;
    }

    const result = await deleteUser(userId);

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    res.status(500).json({
      error: "Failed to delete user",
    });
  }
};

// REGISTER user
export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      idUser,
      fullName,
      email,
      phone,
      password,
    } = req.body;

    if (!idUser || !fullName || !email || !password) {
      res.status(400).json({
        success: false,
        message:
          "idUser, fullName, email, and password are required",
      });
      return;
    }

    // Check whether email already exists
    const existingUsers = await findUserByEmail(email);

    if (existingUsers.length > 0) {
      res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Registration always creates a normal user.
    await createUser(
      idUser,
      fullName,
      email,
      "user",
      phone || null,
      hashedPassword
    );

    res.status(201).json({
      success: true,
      message:
        "Registration successful. You can now log in.",
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

// LOGIN user
export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const users = await findUserByEmail(email);

    if (users.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is not configured");

      res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.idUser,
        email: user.email,
        role: user.role,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};