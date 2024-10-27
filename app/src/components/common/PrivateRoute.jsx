import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Pending from "@/pages/Pending";
import Denied from "@/pages/Denied";

const PrivateRoute = ({ children }) => {
  const { currentUser, userData } = useAuth();

  console.log(currentUser);

  return currentUser ? (
    userData?.status == "pending" ? (
      <Pending />
    ) : userData?.status == "denied" ? (
      <Denied />
    ) : (
      children
    )
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
