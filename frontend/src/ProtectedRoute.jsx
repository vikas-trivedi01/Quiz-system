import { useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "./context/UserContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role, loading } = useContext(userContext);

  if (loading) return <div>Loading your details...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/users/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return children;
};

export default ProtectedRoute;
