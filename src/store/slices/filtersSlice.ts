// features/filters/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  appsPageFilters: string[];
  appsPageSorters: string[];
}

const initialState: FiltersState = {
  appsPageFilters: [],
  appsPageSorters: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAppsPageFilters(state, action: PayloadAction<string[]>) {
      state.appsPageFilters = action.payload;
    },
    setAppsPageSorters(state, action: PayloadAction<string[]>) {
      state.appsPageSorters = action.payload;
    },
  },
});

export const { setAppsPageFilters, setAppsPageSorters } = filtersSlice.actions;
export default filtersSlice.reducer;
