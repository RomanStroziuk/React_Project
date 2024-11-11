import { useState } from 'react';
import { CategoryService } from '../service/CategoryService';

export const useCreateCategory = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const categoryService = new CategoryService();

  const createCategory = async (category) => {
    setLoading(true);
    try {
      const response = await categoryService.createCategory(category);
      return response;
    } catch (error) {
      setError(error.message || "Unknown error occurred");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, error, loading };
};

export default useCreateCategory;