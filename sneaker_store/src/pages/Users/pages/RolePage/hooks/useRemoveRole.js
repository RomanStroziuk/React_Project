import { useState } from 'react';
import { RoleService } from '../service/RoleService';

export const useRemoveRole = (roles, setRoles) => {
  const [error, setError] = useState(null);

  let roleService = new RoleService();

  const removeRole = (id) => {
    const makeDeleteApiRequest = async () => {
      try {
        await roleService.deleteRole(id);
        setRoles(roles.filter((role) => role.id !== id));
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

  return { removeRole, error };
};
