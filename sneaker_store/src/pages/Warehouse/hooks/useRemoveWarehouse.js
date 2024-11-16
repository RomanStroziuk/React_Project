import { useState } from 'react';
import { WarehouseService } from '../service/WarehouseService';

export const useRemoveWarehouse = (warehouses, setWarehouses) => {
  const [error, setError] = useState(null);

  let warehouseService = new WarehouseService();

  const removeWarehouse = (id) => {
    const makeDeleteApiRequest = async () => {
      try {
        await warehouseService.deleteWarehouse(id);
        setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
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

  return { removeWarehouse, error };
};

