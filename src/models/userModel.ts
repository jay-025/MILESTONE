import pool from "../db";

// GET all users
// Password is intentionally NOT returned.
export const getAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT idUser, fullName, email, role, phone
     FROM user`
  );

  return rows;
};

// FIND user by email
// Used during login because we need the password hash.
export const findUserByEmail = async (
  email: string
) => {
  const [rows]: any = await pool.query(
    "SELECT * FROM user WHERE email = ?",
    [email]
  );

  return rows;
};

// CREATE user
export const createUser = async (
  idUser: number,
  fullName: string,
  email: string,
  role: string,
  phone: string | null,
  hashedPassword: string
) => {
  const [result] = await pool.query(
    `INSERT INTO user
     (idUser, fullName, email, role, phone, password)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      idUser,
      fullName,
      email,
      role,
      phone,
      hashedPassword,
    ]
  );

  return result;
};

// UPDATE user
export const updateUser = async (
  userId: number,
  fullName: string,
  email: string,
  role: string | null,
  phone: string | null
) => {
  const [result]: any = await pool.query(
    `UPDATE user
     SET fullName = ?,
         email = ?,
         role = ?,
         phone = ?
     WHERE idUser = ?`,
    [
      fullName,
      email,
      role,
      phone,
      userId,
    ]
  );

  return result;
};

// DELETE user
export const deleteUser = async (
  userId: number
) => {
  const [result]: any = await pool.query(
    "DELETE FROM user WHERE idUser = ?",
    [userId]
  );

  return result;
};