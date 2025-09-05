// src/api/userApi.ts
import axios from "axios";
import { getIdToken } from "firebase/auth";
import { auth } from "../Firebase/Firebase"; 
const API = import.meta.env.VITE_API_URL;

const API_URL = `${API}/api/user`; 

export const createOrGetUser = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const idToken = await getIdToken(user);

  const response = await axios.post(
    `${API_URL}/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  return response.data.user; 
};
