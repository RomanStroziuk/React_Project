import { useMemo } from "react";

const useGetUserRole = () => {
  const userJson = localStorage.getItem("user");

  const user = useMemo(() => (userJson ? JSON.parse(userJson) : null), [userJson]);

  return user;
};

export default useGetUserRole;