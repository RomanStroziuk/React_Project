import { useEffect, useState } from "react";
import {  StatusService } from "../service/StatusService";

export const useGetAllStatutes = () => {
  const [statutes, setStatutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const statusService = new StatusService(signal);

    const fetchStatutes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await statusService.getAllStatutes();

        if (isMounted) {
          setStatutes(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatutes();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { statutes: statutes, setStatutes, loading, error };
};

