import { useEffect, useState } from "react";
import { WarehouseService } from '../service/WarehouseService';

export const useGetAllWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const warehouseService = new WarehouseService(signal);

    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await warehouseService.getAllWarehouses();

        if (isMounted) {
          setWarehouses(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { warehouses, setWarehouses, loading, error };
};


