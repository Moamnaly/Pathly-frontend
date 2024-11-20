import { getAccessToken } from "../utils/storageUtility";
import { Navigate } from "react-router-dom";
import { authRoutes } from "../config/routeConstants";

export function ProtectedRoute({ children }) {
  const accessToken = getAccessToken();

  return accessToken ? <> {children}</> : <Navigate to={authRoutes.login} />;
}
