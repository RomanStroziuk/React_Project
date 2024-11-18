import { useState } from 'react';
import { UserService } from '../service/UserService';

export const useRemoveUsers = (users, setUsers) => {
  const [error, setError] = useState(null);

  let userService = new UserService();

  const removeUsers = (id) => {
    const makeDeleteApiRequest = async () => {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
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

  return { removeUsers, error };
};

