import { appType } from "@/types/app.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type KeyValueStore = {
  [key: string]: appType[] | undefined;
};

interface SearchState {
  queries: KeyValueStore;
  ttl: number;
}

const initialState: SearchState = {
  queries: {},
  ttl: Date.now(),
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateQueries: (state, action: PayloadAction<Partial<KeyValueStore>>) => {
      state.queries = { ...state.queries, ...action.payload };
    },
    resetQueries: (state) => {
      state.queries = initialState.queries;
    },
  },
});

export const { updateQueries, resetQueries } = searchSlice.actions;

export default searchSlice.reducer;
