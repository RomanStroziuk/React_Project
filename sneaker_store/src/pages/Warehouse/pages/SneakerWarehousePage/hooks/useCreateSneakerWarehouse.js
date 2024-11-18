import { useState } from "react";
import { SneakerWarehouseService } from "../service/SneakerWarehouseService";

export const useCreateSneakerWarehouse = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let sneakerWarehouseService = new SneakerWarehouseService();

    const createSneakerWarehouse = async (sneakeWarehouse) => {
        setLoading(true);
        try {
          const response = await sneakerWarehouseService.createSneakerWarehouse(sneakeWarehouse);
          console.log(response);
          return response;
        } catch (error) {
          setError(error.massage || 'Unknown error occurred');
          throw error;
        } finally {
          setLoading(false);
        }
      };

    return { createSneakerWarehouse, error, loading };
};

export default useCreateSneakerWarehouse;