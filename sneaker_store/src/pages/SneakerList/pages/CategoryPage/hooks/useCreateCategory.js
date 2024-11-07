import { useState } from 'react';
import { CategoryService } from '../service/CategoryService';

export const useCreateCategory = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let categoryService = new CategoryService();

  const createCategory = async (category) => {
    setLoading(true);
    try {
      const response = await categoryService.createCategory(category);
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, error, loading };
};

export default useCreateCategory;