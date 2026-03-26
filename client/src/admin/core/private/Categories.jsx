import React, { useEffect, useState } from "react";
import "../../styles/categories.css";
import { useCategories } from "../../../hooks/useCategories";

const Categories = () => {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await createCategory(newCategoryName);
      setNewCategoryName("");
      setIsCreating(false);
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  const handleUpdateCategory = async (id) => {
    if (!editingName.trim()) return;
    try {
      await updateCategory(id, editingName);
      setEditingId(null);
      setEditingName("");
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  return (
    <div className="page active" id="page-categories">
      <div className="page-header">
        <div>
          <div className="page-title-lg">Categories</div>
          <div className="page-sub">{categories.length} categories</div>
        </div>
        <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
          + Add Category
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "12px",
            background: "rgba(239,68,68,0.1)",
            color: "#EF4444",
            borderRadius: "8px",
            marginBottom: "20px",
          }}>
          Error: {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          Loading categories...
        </div>
      ) : (
        <div className="cat-list">
          {isCreating && (
            <div className="cat-row" style={{ background: "var(--off-white)" }}>
              <input
                type="text"
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  flex: 1,
                }}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={handleAddCategory}>
                Save
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setIsCreating(false);
                  setNewCategoryName("");
                }}>
                Cancel
              </button>
            </div>
          )}

          {categories.map((cat) => (
            <div className="cat-row" key={cat.id}>
              <div className="cat-icon-wrap">📁</div>
              {editingId === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      flex: 1,
                    }}
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdateCategory(cat.id)}>
                    Save
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setEditingId(null);
                      setEditingName("");
                    }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-count">{cat.count} items</span>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setEditingId(cat.id);
                      setEditingName(cat.name);
                    }}>
                    Edit
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDeleteCategory(cat.id)}
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      color: "#EF4444",
                      border: "none",
                    }}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
