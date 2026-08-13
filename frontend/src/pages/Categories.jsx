import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] =
    useState([]);

  const [message, setMessage] =
    useState("");

  // ADD CATEGORY states
  const [categoryId, setCategoryId] =
    useState("");

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("");

  // UPDATE CATEGORY states
  const [updateId, setUpdateId] =
    useState("");

  const [updateName, setUpdateName] =
    useState("");

  const [
    updateDescription,
    setUpdateDescription,
  ] = useState("");

  const [
    updateStatus,
    setUpdateStatus,
  ] = useState("");

  // DELETE CATEGORY state
  const [deleteId, setDeleteId] =
    useState("");

  const token =
    sessionStorage.getItem("token");

  // GET categories when page loads
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/categories",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (response.ok) {
          setCategories(data);
        } else {
          setMessage(
            data.error ||
              data.message ||
              "Failed to get categories"
          );
        }
      } catch (error) {
        console.error(error);

        setMessage(
          "Unable to connect to server"
        );
      }
    };

    loadCategories();
  }, [token]);

  // Refresh categories after CRUD
  const refreshCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/categories",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setCategories(data);
      } else {
        setMessage(
          data.error ||
            data.message ||
            "Failed to refresh categories"
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to refresh categories"
      );
    }
  };

  // ADD CATEGORY
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (Number(categoryId) <= 0) {
      setMessage(
        "Category ID must be greater than 0."
      );
      return;
    }

    if (name.trim().length < 2) {
      setMessage(
        "Category name must be at least 2 characters."
      );
      return;
    }

    if (
      description.trim().length < 3
    ) {
      setMessage(
        "Description must be at least 3 characters."
      );
      return;
    }

    if (!status.trim()) {
      setMessage(
        "Category status is required."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3002/categories",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            category_id:
              Number(categoryId),

            name:
              name.trim(),

            description:
              description.trim(),

            status:
              status.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {
        setMessage(
          "Category created successfully"
        );

        setCategoryId("");
        setName("");
        setDescription("");
        setStatus("");

        await refreshCategories();
      } else {
        setMessage(
          data.error ||
            data.message ||
            "Failed to create category"
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to server"
      );
    }
  };

  // UPDATE CATEGORY
  const handleUpdateCategory =
    async (e) => {
      e.preventDefault();

      if (Number(updateId) <= 0) {
        setMessage(
          "Category ID must be greater than 0."
        );
        return;
      }

      if (
        updateName.trim().length < 2
      ) {
        setMessage(
          "Category name must be at least 2 characters."
        );
        return;
      }

      if (
        updateDescription.trim().length <
        3
      ) {
        setMessage(
          "Description must be at least 3 characters."
        );
        return;
      }

      if (!updateStatus.trim()) {
        setMessage(
          "Category status is required."
        );
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3002/categories/${updateId}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              name:
                updateName.trim(),

              description:
                updateDescription.trim(),

              status:
                updateStatus.trim(),
            }),
          }
        );

        const data =
          await response.json();

        if (response.ok) {
          setMessage(
            "Category updated successfully"
          );

          setUpdateId("");
          setUpdateName("");
          setUpdateDescription("");
          setUpdateStatus("");

          await refreshCategories();
        } else {
          setMessage(
            data.error ||
              data.message ||
              "Failed to update category"
          );
        }
      } catch (error) {
        console.error(error);

        setMessage(
          "Unable to connect to server"
        );
      }
    };

  // DELETE CATEGORY
  const handleDeleteCategory =
    async (e) => {
      e.preventDefault();

      if (Number(deleteId) <= 0) {
        setMessage(
          "Please enter a valid Category ID."
        );
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3002/categories/${deleteId}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (response.ok) {
          setMessage(
            "Category deleted successfully"
          );

          setDeleteId("");

          await refreshCategories();
        } else {
          setMessage(
            data.error ||
              data.message ||
              "Failed to delete category"
          );
        }
      } catch (error) {
        console.error(error);

        setMessage(
          "Unable to connect to server"
        );
      }
    };

  return (
    <div className="page-container">
      <h1 className="page-title">
        Categories
      </h1>

      {/* ADD CATEGORY */}
      <div className="card">
        <h2>Add Category</h2>

        <form
          className="form-grid"
          onSubmit={
            handleAddCategory
          }
        >
          <input
            type="number"
            placeholder="Category ID"
            min="1"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Category Name"
            minLength="2"
            maxLength="45"
            value={name}
            onChange={(e) =>
              setName(
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
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            required
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            required
          >
            <option value="">
              Select Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            className="add-button"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>

      {/* UPDATE CATEGORY */}
      <div className="card">
        <h2>Update Category</h2>

        <form
          className="form-grid"
          onSubmit={
            handleUpdateCategory
          }
        >
          <input
            type="number"
            placeholder="Category ID to Update"
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
            placeholder="Category Name"
            minLength="2"
            maxLength="45"
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
            placeholder="Description"
            minLength="3"
            maxLength="255"
            value={
              updateDescription
            }
            onChange={(e) =>
              setUpdateDescription(
                e.target.value
              )
            }
            required
          />

          <select
            value={updateStatus}
            onChange={(e) =>
              setUpdateStatus(
                e.target.value
              )
            }
            required
          >
            <option value="">
              Select Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            className="update-button"
            type="submit"
          >
            Update Category
          </button>
        </form>
      </div>

      {/* DELETE CATEGORY */}
      <div className="card">
        <h2>Delete Category</h2>

        <form
          className="form-grid"
          onSubmit={
            handleDeleteCategory
          }
        >
          <input
            type="number"
            placeholder="Category ID to Delete"
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
            className="delete-button"
            type="submit"
          >
            Delete Category
          </button>
        </form>
      </div>

      {message && (
        <p className="message">
          {message}
        </p>
      )}

      {/* CATEGORY LIST */}
      <h2>Category List</h2>

      <div className="list-grid">
        {categories.map(
          (category) => (
            <div
              className="item-card"
              key={
                category.category_id
              }
            >
              <h3>
                {category.name}
              </h3>

              <p>
                <strong>ID:</strong>{" "}
                {
                  category.category_id
                }
              </p>

              <p>
                <strong>
                  Description:
                </strong>{" "}
                {
                  category.description
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {category.status}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Categories;