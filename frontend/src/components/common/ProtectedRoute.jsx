import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/unauthorized" replace />;

  try {
    const decoded = jwtDecode(token); 
    const role = decoded.role;

    if (role !== `ROLE_${requiredRole}`) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;

  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" replace />;
  }
}
