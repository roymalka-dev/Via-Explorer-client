import { ConfigurationItem } from "@/types/configurations.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigurationsState {
  data: ConfigurationItem[];
  ttl: number;
}

const initialState: ConfigurationsState = {
  data: [],
  ttl: Date.now(),
};

const appsSlice = createSlice({
  name: "configurations",
  initialState,
  reducers: {
    setConfigurations: (
      state,
      action: PayloadAction<{ data: ConfigurationItem[] }>
    ) => {
      state.data = action.payload.data;
    },
    resetConfigurations: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { setConfigurations, resetConfigurations } = appsSlice.actions;
export default appsSlice.reducer;
