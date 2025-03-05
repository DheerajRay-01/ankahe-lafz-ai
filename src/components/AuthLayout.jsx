import { Outlet, Navigate, useLocation } from "react-router";

const AuthLayout = ({ auth = true }) => {
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();

  
  if (isAuthenticated && !auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  
  if (!isAuthenticated && auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
