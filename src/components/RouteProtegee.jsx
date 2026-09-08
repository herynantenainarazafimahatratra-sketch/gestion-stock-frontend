import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RouteProtegee({ children, roleRequis }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequis && user.role !== roleRequis) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RouteProtegee;
