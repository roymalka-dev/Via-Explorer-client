import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  authorization: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  authorization: "USER",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setAuthorization: (
      state,
      action: PayloadAction<{ authorization: string }>
    ) => {
      state.authorization = action.payload.authorization;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setCredentials, setAuthorization, logout, setAuthenticated } =
  authSlice.actions;
export default authSlice.reducer;
