import { useState } from 'react';
import { BrandService } from '../service/BrandService';

export const useRemoveBrand = (brands, setBrands) => {
  const [error, setError] = useState(null);

  let brandService = new BrandService();

  const removeBrand = (id) => {
    const makeDeleteApiRequest = async () => {
      try {
        await brandService.deleteBrand(id);
        setBrands(brands.filter((brand) => brand.id !== id));
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

  return { removeBrand, error };
};
