import { useEffect, useState } from "react";
import { CategoryService } from "../service/CategoryService";

export const useGetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const categoryService = new CategoryService(signal);

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await categoryService.getAllCategories();

        if (isMounted) {
          setCategories(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { categories, setCategories, loading, error };
};

