import { useState } from 'react';
import { RoleService } from '../service/RoleService';

export const useCreateRole = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let roleService = new RoleService();

  const createRole = async (role) => {
    setLoading(true);
    try {
      const response = await roleService.createRole(role);
      return response;
    } catch (error) {
      setError(error.massage || 'Unknown error occurred');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createRole, error, loading };
};

export default useCreateRole;