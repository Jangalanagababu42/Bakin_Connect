import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function RequiresAuth({ children }) {
  const { filterAuthUser } = useUser();
  const location = useLocation();
  return filterAuthUser ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
