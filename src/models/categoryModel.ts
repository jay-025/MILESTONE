import pool from "../db";

// GET all categories
export const getAllCategories = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM category"
  );

  return rows;
};

// CREATE category
export const createCategory = async (
  categoryId: number,
  name: string,
  description: string | null,
  status: string | null
) => {
  const [result] = await pool.query(
    `INSERT INTO category
     (category_id, name, description, status)
     VALUES (?, ?, ?, ?)`,
    [
      categoryId,
      name,
      description,
      status,
    ]
  );

  return result;
};

// UPDATE category
export const updateCategory = async (
  categoryId: number,
  name: string,
  description: string | null,
  status: string | null
) => {
  const [result]: any = await pool.query(
    `UPDATE category
     SET name = ?,
         description = ?,
         status = ?
     WHERE category_id = ?`,
    [
      name,
      description,
      status,
      categoryId,
    ]
  );

  return result;
};

// DELETE category
export const deleteCategory = async (
  categoryId: number
) => {
  const [result]: any = await pool.query(
    "DELETE FROM category WHERE category_id = ?",
    [categoryId]
  );

  return result;
};