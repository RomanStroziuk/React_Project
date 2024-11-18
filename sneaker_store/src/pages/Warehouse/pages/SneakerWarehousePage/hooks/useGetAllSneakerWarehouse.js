import { useEffect, useState } from "react";
import { SneakerWarehouseService } from "../service/SneakerWarehouseService";

export const useGetAllSneakerWarehouse = () => {
  const [sneakerWarehouses, setSneakerWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const sneakerWarehouseService = new SneakerWarehouseService(signal);

    const fetchSneakerWarehouses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await sneakerWarehouseService.getAllSneakerWarehouses();

        if (isMounted) {
          setSneakerWarehouses(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSneakerWarehouses();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { sneakerWarehouses, setSneakerWarehouses, loading, error };
};

