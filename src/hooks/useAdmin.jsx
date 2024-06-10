import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://project-matrimony-server.vercel.app/users/admin/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
