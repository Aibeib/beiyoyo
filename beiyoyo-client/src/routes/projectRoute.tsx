// routes/ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token"); // 示例

  return token ? children : <Navigate to="/login" />;
};
