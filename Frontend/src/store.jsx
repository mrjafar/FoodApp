import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storeSlice from "./features/ItemsSlice/ItemsSlice";

const rootReducer = combineReducers({
  foodItems: storeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});