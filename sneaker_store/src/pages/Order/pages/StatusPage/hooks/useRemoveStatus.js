import { useState } from 'react';
import { StatusService } from '../service/StatusService';

export const useRemoveStatus = (statutes, setStatutes) => {
  const [error, setError] = useState(null);

  let statusService = new StatusService();

  const removeStatus = (id) => {
    const makeDeleteApiRequest = async () => {
      try {
        await statusService.deleteStatus(id);
        setStatutes(statutes.filter((status) => status.id !== id));
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

  return { removeStatus, error };
};
