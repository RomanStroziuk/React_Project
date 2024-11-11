import { useState } from 'react';
import { BrandService } from '../service/BrandService';

export const useCreateBrand = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let brandService = new BrandService();

  const createBrand = async (brand) => {
    setLoading(true);
    try {
      const response = await brandService.createBrand(brand);
      return response;
    } catch (error) {
      setError(error.massage || 'Unknown error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createBrand, error, loading };
};

export default useCreateBrand;