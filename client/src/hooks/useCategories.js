import { useState, useCallback } from "react";
import * as CategoryAPI from "../API/Categories";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CategoryAPI.getAllCategories();
      setCategories(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(
    async (name) => {
      try {
        setLoading(true);
        setError(null);
        const newCategory = await CategoryAPI.createCategory(name);
        setCategories([...categories, newCategory]);
        return newCategory;
      } catch (err) {
        setError(err.message);
        console.error("Error creating category:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [categories],
  );

  const updateCategory = useCallback(
    async (id, name) => {
      try {
        setLoading(true);
        setError(null);
        const updatedCategory = await CategoryAPI.updateCategory(id, name);
        setCategories(
          categories.map((c) => (c.id === id ? updatedCategory : c)),
        );
        return updatedCategory;
      } catch (err) {
        setError(err.message);
        console.error("Error updating category:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [categories],
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        await CategoryAPI.deleteCategory(id);
        setCategories(categories.filter((c) => c.id !== id));
      } catch (err) {
        setError(err.message);
        console.error("Error deleting category:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [categories],
  );

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
