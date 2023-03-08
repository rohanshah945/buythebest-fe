import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Store/UserContext";

function ProtectedRoute({ children }) {
  const {
    user: { user },
  } = useContext(UserContext);

  let isAuthenticated = Object.keys(user).length;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
