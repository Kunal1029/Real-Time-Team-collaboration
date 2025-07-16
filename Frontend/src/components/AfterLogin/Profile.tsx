/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks"; // explained below
import { useNavigate , Navigate } from "react-router-dom";
import { logoutUser } from "../Redux/Features/authSlice";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const Profile = () => {
  // const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [mu, setMu] = useState<any>(null);
  const navigate = useNavigate();
  const logO = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const isUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMu(user);
        // console.log(user);
      } else {
        setMu(null); // explicitly set null when logged out
      }
    });

    return () => isUser(); // cleanup listener
  }, []);

  if (!mu) {
     <Navigate to="/login" replace />;
  }

  const goToAdmin = () => {
    navigate("/role/admin");
  };

  return (
    <div className="text-center" style={{ width: "98vw", height: "500px" }}>
      <h1 className="text-center">
        {mu?.email || "no email"} ------- {JSON.stringify(mu, null, 2)}
      </h1>
      <br />
      <button onClick={logO}>Logout</button> <br />
      <br />
      <button className="" onClick={goToAdmin}>
        Admin
      </button>
    </div>
  );
};

export default Profile;
