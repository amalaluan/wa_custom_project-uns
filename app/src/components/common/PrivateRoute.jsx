import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Pending from "@/pages/Pending";
import Denied from "@/pages/Denied";
import VerifyEmail from "@/pages/VerifyEmail";

const PrivateRoute = ({ children }) => {
  const { currentUser, userData } = useAuth();

  return currentUser ? (
    !currentUser.emailVerified ? (
      <VerifyEmail />
    ) : userData?.status === "pending" ? (
      <Pending />
    ) : userData?.status === "denied" ? (
      <Denied />
    ) : (
      children
    )
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
