import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { logged } = useSelector((state) => state.auth);
  console.log("private logged: " + logged);
  return logged ? children : <Navigate to="/login" />;
};
