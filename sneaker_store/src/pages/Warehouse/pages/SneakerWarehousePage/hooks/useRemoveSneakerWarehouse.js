import { useState } from 'react';
import { SneakerWarehouseService } from '../service/SneakerWarehouseService';

export const useRemoveSneakerWarehouse = (sneakerWarehouse, setSneakerWarehouse) => {
  const [error, setError] = useState(null);

  let sneakerWarehouseService = new SneakerWarehouseService();

  const removeSneakerWarehouse = (id) => {
    const makeDeleteApiRequest = async () => {
      try {
        await sneakerWarehouseService.deleteWarehouse(id);
        setSneakerWarehouse(sneakerWarehouse.filter((sneakerWarehouse) => sneakerWarehouse.id !== id));
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

  return { removeSneakerWarehouse, error };
};

