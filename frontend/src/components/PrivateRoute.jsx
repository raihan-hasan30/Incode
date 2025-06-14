import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or a spinner
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

export default PrivateRoute;
