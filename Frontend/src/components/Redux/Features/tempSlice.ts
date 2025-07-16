// src/features/tempSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Role = "admin" | "manager" | "member";

interface TempState {
  currRole: Role | null;
  currteam: string | null;
  pageSwitch: string | null;
  teamID: string | null;
}

const initialState: TempState = {
  currRole: "member",
  currteam: null,
  pageSwitch: null,
  teamID: null
};

const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    setUserRole(state, action: PayloadAction<Role | null>) {
      state.currRole = action.payload;
    },
    setTeam(state, action: PayloadAction<string | null>) {
      state.currteam = action.payload;
    },
    setPage(state, action: PayloadAction<string | null>) {
      state.pageSwitch = action.payload;
    },
    setTeamID(state, action: PayloadAction<string | null>) {
      state.teamID = action.payload;
    },
  },
});

export const { setTeam, setUserRole, setPage, setTeamID } = tempSlice.actions;

export default tempSlice.reducer;
