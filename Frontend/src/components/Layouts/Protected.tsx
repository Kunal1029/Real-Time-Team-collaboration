import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" />;
};

export default Protected; 
