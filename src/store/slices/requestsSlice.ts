import { RequestType } from "@/types/request.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestsDataState {
  data: RequestType[];
}

const initialState: RequestsDataState = {
  data: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests: (
      state,
      action: PayloadAction<{ requests: RequestType[] }>
    ) => {
      state.data = action.payload.requests;
    },
  },
});

export const { setRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
