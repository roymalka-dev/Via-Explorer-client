import { appType } from "@/types/app.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppsDataState {
  data: appType[];
}

const initialState: AppsDataState = {
  data: [],
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setApps: (state, action: PayloadAction<{ apps: appType[] }>) => {
      state.data = action.payload.apps;
    },
  },
});

export const { setApps } = appsSlice.actions;
export default appsSlice.reducer;
