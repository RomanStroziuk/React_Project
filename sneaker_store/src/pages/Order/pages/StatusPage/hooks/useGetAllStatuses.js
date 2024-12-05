import { useEffect, useState } from "react";
import { StatusService } from "../service/StatusService";

export const useGetAllStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const statusService = new StatusService(signal);

    const fetchStatuses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await statusService.getAllStatutes();

        if (isMounted) {
          setStatuses(response);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return { statuses, setStatuses, loading, error };
};
