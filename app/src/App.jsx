import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ManageBuilding from "./pages/ManageBuilding";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import LoadingScreen from "./components/common/LoadingScreen";
import ManageAdmin from "./pages/ManageAdmin";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <LoadingScreen />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/reset"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        {/* <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        /> */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-building"
          element={
            <PrivateRoute>
              <ManageBuilding />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <NotFound />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/manage-admins"
          element={
            <PrivateRoute>
              <ManageAdmin />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
