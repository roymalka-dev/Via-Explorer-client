import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type KeyValueStore = {
  [key: string]: string | undefined;
};

interface SearchState {
  queries: KeyValueStore;
}

const initialState: SearchState = {
  queries: {},
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
