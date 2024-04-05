import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./slices/themeSlice";
import filtersReducer from "./slices/filtersSlice";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";
import appsReducer from "./slices/appsSlice";
import configurationsReducer from "./slices/configurationsSlice";
import searchReducer from "./slices/searchSlice";
const rootReducer = combineReducers({
  theme: themeReducer,
  filters: filtersReducer,
  auth: authReducer,
  form: formReducer,
  apps: appsReducer,
  configurations: configurationsReducer,
  search: searchReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "auth", "form", "apps", "configurations", "search"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["form"],
      },
      immutableCheck: false,
      thunk: true,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
