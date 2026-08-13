import { Request, Response } from "express";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../models/categoryModel";

// GET all categories
export const getCategories = async (
  _req: Request,
  res: Response
) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error getting categories:", error);

    res.status(500).json({
      error: "Failed to get categories",
    });
  }
};

// CREATE category
export const addCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      category_id,
      name,
      description,
      status,
    } = req.body;

    if (!category_id || !name) {
      res.status(400).json({
        error: "category_id and name are required",
      });
      return;
    }

    await createCategory(
      category_id,
      name,
      description || null,
      status || null
    );

    res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);

    res.status(500).json({
      error: "Failed to create category",
    });
  }
};

// UPDATE category
export const editCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId = Number(req.params.id);

    const {
      name,
      description,
      status,
    } = req.body;

    if (Number.isNaN(categoryId)) {
      res.status(400).json({
        error: "Category ID must be a number",
      });
      return;
    }

    if (!name) {
      res.status(400).json({
        error: "Category name is required",
      });
      return;
    }

    const result = await updateCategory(
      categoryId,
      name,
      description || null,
      status || null
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Category not found",
      });
      return;
    }

    res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);

    res.status(500).json({
      error: "Failed to update category",
    });
  }
};

// DELETE category
export const removeCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId = Number(req.params.id);

    if (Number.isNaN(categoryId)) {
      res.status(400).json({
        error: "Category ID must be a number",
      });
      return;
    }

    const result = await deleteCategory(categoryId);

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Category not found",
      });
      return;
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);

    res.status(500).json({
      error: "Failed to delete category",
    });
  }
};