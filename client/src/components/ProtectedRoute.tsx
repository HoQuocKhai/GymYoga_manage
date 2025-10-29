import { Navigate, useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import type { User } from "../types/userType";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user: User = JSON.parse(sessionStorage.getItem("user") || "null");
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
