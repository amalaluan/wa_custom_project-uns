import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
