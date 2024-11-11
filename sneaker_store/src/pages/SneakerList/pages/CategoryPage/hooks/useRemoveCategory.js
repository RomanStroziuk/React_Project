import { useState } from 'react';
import { CategoryService } from '../service/CategoryService';

export const useRemoveCategory = (categories, setCategories) => {
  const [error, setError] = useState(null);

  let categoryService = new CategoryService();

  const removeCategory = (id) => {
    const makeDeleteApiRequest = async () => {
      try {
        await categoryService.deleteCategory(id);
        setCategories(categories.filter((category) => category.id !== id));
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
    };

    makeDeleteApiRequest();
  };

  return { removeCategory, error };
};
