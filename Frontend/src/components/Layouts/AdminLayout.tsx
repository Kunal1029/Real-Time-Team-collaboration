/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, Navigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isUser = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => isUser(); // cleanup listener
  }, []);

  if (loading) return <div className="p-4">Loading...</div>; 

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
