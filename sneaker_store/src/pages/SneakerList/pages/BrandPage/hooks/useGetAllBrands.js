import { useEffect, useState } from "react";
import { BrandService } from "../service/BrandService";

export const useGetAllBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const brandService = new BrandService(signal);

    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await brandService.getAllBrands();

        if (isMounted) {
          setBrands(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { brands, setBrands, loading, error };
};

