import { useState } from 'react';
import { WarehouseService } from '../service/WarehouseService';

export const useCreateWarehouse = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let warehouseService = new WarehouseService();

  const createWarehouse = async (warehouse) => {
    setLoading(true);
    try {
      const response = await warehouseService.createWarehouse(warehouse);
      return response;
    } catch (error) {
      setError(error.massage || 'Unknown error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createWarehouse, error, loading };
};

export default useCreateWarehouse;
