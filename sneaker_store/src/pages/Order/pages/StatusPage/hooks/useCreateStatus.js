import { useState } from 'react';
import { StatusService } from '../service/StatusService';

export const useCreateStatus = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let statusService = new StatusService();

  const createStatus = async (status) => {
    setLoading(true);
    try {
      const response = await statusService.createStatus(status);
      return response;
    } catch (error) {
      setError(error.massage || 'Unknown error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createStatus, error, loading };
};

export default useCreateStatus;