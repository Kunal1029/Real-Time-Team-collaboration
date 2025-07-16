import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import type { ReactNode } from "react";

interface props {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleBasedAuth = ({ allowedRoles, children }: props) => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes("admin")) return <Navigate to="/unauthorized" />;
  return children;
};

export default RoleBasedAuth;
