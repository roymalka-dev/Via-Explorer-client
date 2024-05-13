import { appType } from "@/types/app.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppsDataState {
  data: appType[];
  ttl: number;
}

const initialState: AppsDataState = {
  data: [],
  ttl: Date.now(),
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setApps: (state, action: PayloadAction<{ apps: appType[] }>) => {
      state.data = action.payload.apps;
      state.ttl = Date.now();
    },
  },
});

export const { setApps } = appsSlice.actions;
export default appsSlice.reducer;
