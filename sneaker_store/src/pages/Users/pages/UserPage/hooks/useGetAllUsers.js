import { useEffect, useState } from "react";
import { UserService } from "../service/UserService";

export const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const userService = new UserService(signal);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
    
        const response = await userService.getAllUsers();

        if (isMounted) {
          setUsers(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return {  users, setUsers, loading, error };
};


