/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/teamSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../../Firebase/Firebase";
import { getIdToken } from "firebase/auth";

export interface Team {
  _id: string;
  name: string;
  description: string;
  members: {
    user: string;
    role: "admin" | "manager" | "member";
  }[];
  createdAt: string;
  updatedAt: string;
}

interface TeamState {
  teams: Team[];
  currentTeam: Team | null;
  loading: boolean;
  error: string | null;
  nonMembers: any[];
  nonAdminMembers: any[];
}

const initialState: TeamState = {
  teams: [],
  currentTeam: null,
  loading: false,
  error: null,
  nonMembers: [],
  nonAdminMembers: [],
};

// Utility: Get Firebase Auth Header
const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const token = await getIdToken(user);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// teamSlice.ts
export const getCurrentTeam = createAsyncThunk(
  "team/getCurrentTeam",
  async (teamId: string, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const token = await getIdToken(user);
      const res = await axios.get(`/api/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.team;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Fetch all teams of current user
export const fetchTeams = createAsyncThunk(
  "team/fetchTeams",
  async (_, thunkAPI) => {
    try {
      const config = await getAuthHeader();
      const res = await axios.get("/api/team", config);
      return res.data.teams;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Create a team
export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (
    { name, description }: { name: string; description: string },
    thunkAPI
  ) => {
    try {
      const config = await getAuthHeader();
      const res = await axios.post("/api/team", { name, description }, config);
      return res.data.team;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Promote a member to manager
export const promoteMember = createAsyncThunk(
  "team/promoteMember",
  async ({ teamId, userId }: { teamId: string; userId: string }, thunkAPI) => {
    try {
      const config = await getAuthHeader();
      const res = await axios.put(
        `/api/team/${teamId}/promote/${userId}`,
        {},
        config
      );
      return res.data.team;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);


const BASE_URL = import.meta.env.VITE_API_URL || '';

export const addMember = createAsyncThunk(
  "team/addMember",
  async (
    {
      email,
      teamId,
    }: {
      email: string;
      teamId: string;
    },
    thunkAPI
  ) => {
    try {
      const config = await getAuthHeader();
      const res = await axios.put(`${BASE_URL}/api/team/${teamId}/add`, { email }, config);
      return res.data.team;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Remove a member from the team
 

export const removeMember = createAsyncThunk(
  "team/removeMember",
  async ({ teamId, userId }: { teamId: string; userId: string }, thunkAPI) => { //current teamid & userid (which needs to remove)
    try {
      console.log(teamId, userId)
      const config = await getAuthHeader();
      const res = await axios.delete(
        `/api/team/${teamId}/remove/${userId}`,
        config
      );
      return res.data.team;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);



export const fetchNonMembers = createAsyncThunk(
  "team/fetchNonMembers",
  async (teamId: string, thunkAPI) => {
    try {
      const config = await getAuthHeader();
      const res = await axios.get(`/api/team/${teamId}/non-members`, config);
      return res.data.nonMembers;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchNonAdminMembers = createAsyncThunk(
  "team/fetchNonAdminMembers",
  async (teamId: string, thunkAPI) => {
    try {
      const config = await getAuthHeader();
      const res = await axios.get(
        `/api/team/${teamId}/non-admin-members`,
        config
      );
      return res.data.nonAdminMembers;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Slice
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchNonMembers.fulfilled, (state, action) => {
        state.nonMembers = action.payload;
        state.loading = false;
      })
      .addCase(fetchNonMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNonMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(fetchNonAdminMembers.fulfilled, (state, action) => {
        state.nonAdminMembers = action.payload;
        state.loading = false;
      })
      .addCase(fetchNonAdminMembers.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchNonAdminMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(getCurrentTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentTeam.fulfilled, (state, action) => {
        state.currentTeam = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload);
        state.loading = false;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(promoteMember.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.teams.findIndex((t) => t._id === updated._id);
        if (index !== -1) {
          state.teams[index] = updated;
        }
      })
      .addCase(promoteMember.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(addMember.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.teams.findIndex((t) => t._id === updated._id);
        if (index !== -1) {
          state.teams[index] = updated;
        }
      })
      .addCase(addMember.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(removeMember.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.teams.findIndex((t) => t._id === updated._id);
        if (index !== -1) {
          state.teams[index] = updated;
        }
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentTeam } = teamSlice.actions;
export default teamSlice.reducer;
