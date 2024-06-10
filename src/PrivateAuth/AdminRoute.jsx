import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  console.log(location.pathname);

  if (loading || isAdminLoading) {
    return <PacmanLoader color="#36d7b7" />;
  }
  if (user && isAdmin) {
    return children;
  }
  return (
    <Navigate state={location.pathname} to="/login" replace={true}></Navigate>
  );
};

export default AdminRoute;
