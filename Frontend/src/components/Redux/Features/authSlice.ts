/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../Firebase/Firebase";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createOrGetUser } from "../../Api/userApi";

export interface AuthState {
  user: string | null;
  allUser: [] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  allUser: null,
  loading: false,
  error: null,
};

// 🔹 Google Signup/Login
export const signUpGoogle = createAsyncThunk(
  "auth/signUpGoogle",
  async (name: string, thunkAPI) => {
    try { 
      const googleProvider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, googleProvider); // 1st: Firebase login
      const idToken = await userCredential.user.getIdToken(); // 2nd: get Firebase token

      // 3rd: call your backend to create/get user from MongoDB
      const res = await axios.post(
        "/api/user",
        {name},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      return res.data.user; // ✅ This will contain the MongoDB user object
    } catch (error: any) {
      console.error("Google sign-up error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔹 Email/Password Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();

      const res = await axios.post(
        "/api/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      return res.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔹 Email/Password Signup
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    {name, email, password }: { name: string; email: string; password: string;  },
    thunkAPI
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken();
      const res = await axios.post(
        "/api/user",
        {name},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      return res.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("Already logged out.");
      }

      const token = await currentUser.getIdToken();
      if (!token) {
        throw new Error("Token not found. Already logged out?");
      }
      await axios.post(
        "/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await signOut(auth);

      return true;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Logout failed");
    }
  }
);

// 🔹 Call Backend to create/get user
export const registerUserInBackend = createAsyncThunk(
  "auth/registerUserInBackend",
  async (_, thunkAPI) => {
    try {
      const user = await createOrGetUser();
      return user.email;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUser",
  async (_, thunkAPI) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");

      const token = await currentUser.getIdToken();
      const res = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("authSlice ",res.data.user)
      return res.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const getAlluser = createAsyncThunk(
  "auth/getAllUser",
  async (_, thunkAPI) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user");
      const token = await currentUser.getIdToken();
      const res = await axios.get("/api/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.allUsers;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      //getuser
      .addCase(getAlluser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlluser.fulfilled, (state, action) => {
        state.allUser = action.payload;
        state.loading = false;
      })
      .addCase(getAlluser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload ?? "Google sign-in failed") as string;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload ?? "Google sign-in failed") as string;
      })

      // Google Sign-In
      .addCase(signUpGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload ?? "Google sign-in failed") as string;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Signup
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      // Backend Create/Get User
      .addCase(registerUserInBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserInBackend.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUserInBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
