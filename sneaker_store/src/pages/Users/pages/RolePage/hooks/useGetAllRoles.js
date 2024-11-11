import { useEffect, useState } from "react";
import { RoleService } from "../service/RoleService";

export const useGetAllRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const roleService = new RoleService(signal);

    const fetchRoles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await roleService.getAllRoles();

        if (isMounted) {
          setRoles(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { roles, setRoles, loading, error };
};

